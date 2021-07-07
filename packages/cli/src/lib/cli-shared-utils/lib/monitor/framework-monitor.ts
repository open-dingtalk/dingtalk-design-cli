import YuyanMonitor, { IMonitorOpts, ILogItem, } from './yuyan-monitor';
import { isPlainObject, } from 'lodash';
import * as os from 'os';
import whoami from '../../../util/whoami';
import getCurrentPkgInfo from '../../../util/getCurrentPkgInfo';
import getCliArgsAndOptions from '../../../util/getCliArgsAndOptions';
import { EApiName, } from '../../../common/types';

/**
 * cli监控client
 * 
 * 上报字段：
 * m为自定义指标，用于在首屏展示
 * d为自定义维度，用于进一步筛选分类
 * c为自定义字段，不直接展示，不筛选，但是如果需要进一步查看详情，比如错误堆栈
 */
export interface IFrameworkMonitorOpts extends IMonitorOpts {
  debug?: boolean;
}

export enum EMonitorCode {
  JS_ERROR = 1,
  API_ERROR = 2,
  PV = 12,
  SPLASH_SCREEN = 13,
  API_INVOKE = 14
}

/**
 * Get default env for monitor.
 */
function getDefaultEnv(): IFrameworkMonitorOpts['env'] {
  const isTest = process.env.NODE_ENV === 'test';
  const isLinux = os.platform() === 'linux';
  return (isTest || isLinux) ? 'test' : 'prod';
}

export class FrameworkMonitor {
  private Tracert: YuyanMonitor;
  private pendingLogItems: Array<
    ILogItem |
    (() => ILogItem) |
    (() => ILogItem[]) |
    (() => null)
  >;

  constructor(public opts: IFrameworkMonitorOpts) {
    this.Tracert = new YuyanMonitor({
      yuyanId: opts.yuyanId,
      _appId: opts._appId,
      env: opts.env || getDefaultEnv(),
      userId: this.username,
    });
    this.pendingLogItems = [];
  }

  /**
   * 环境变量 NO_REPORT 控制是否要进行数据上报
   * 
   * @param logItem 
   * @param immediately 
   * @returns 
   */
  public async log(logItem: ILogItem, immediately = false): Promise<any> {
    if (immediately) {
      if (this.opts.debug) {
        console.log('log', JSON.stringify(logItem));
      }

      if (process.env.NO_REPORT) return;

      try {
        await this.Tracert.log(logItem);
      } catch (e) {
        // do not handle/log this error.
      }
    } else {
      return this.pendingLogItems.push(logItem);
    }
  }

  public async flush(): Promise<void> {
    while (this.pendingLogItems.length) {
      const logItem = this.pendingLogItems.shift();
      const normalizedLogItem = typeof logItem === 'function'
        ? logItem()
        : logItem;

      if (Array.isArray(normalizedLogItem)) {
        normalizedLogItem.forEach(item => this.log(item, true));
      } else if (isPlainObject(normalizedLogItem)) {
        this.log(normalizedLogItem, true);
      }
    }
  }

  public lazyFlush(): void {
    process.nextTick(()=>this.flush());
  }

  public get username(): string {
    if (process.env.USER_NAME) {
      return process.env.USER_NAME;
    }

    try {
      return whoami();
    } catch (e) {
      // do not need to handle.
    }

    return 'N/A';
  }

  public get commandName(): string {
    const cliArgsAndOptions = getCliArgsAndOptions();
    if (cliArgsAndOptions.args && cliArgsAndOptions.args[0]) {
      return cliArgsAndOptions.args[0];
    }

    return 'N/A';
  }

  /**
   * 上报cli pv
   * msg: version 当前cli版本
   * d1: username 用户名
   * d2: commandName 命令名
   * c1: originArgs process.argv
   */
  public logPv(): FrameworkMonitor {
    const pkgInfo = getCurrentPkgInfo();
    this.pendingLogItems.push(() => ({
      code: EMonitorCode.PV,
      msg: pkgInfo.version,
      d1: this.username,
      d2: this.commandName,
      c1: process.argv,
    }));
    this.lazyFlush();
    return this;
  }

  /**
   * 上报jserror错误信息和堆栈
   * msg: error.message
   * d1: version 当前cli版本
   * d2: username 用户名
   * d3: commandName 命令名
   * c1: originArgs process.argv
   * c2: error.stack
   * @param err 
   */
  public logJSError(err: Error): FrameworkMonitor {
    const pkgInfo = getCurrentPkgInfo();
    this.pendingLogItems.push(() => ({
      code: EMonitorCode.JS_ERROR,
      msg: err.message,
      d1: pkgInfo.version,
      d2: this.username,
      d3: this.commandName,
      c1: process.argv,
      c2: err.stack,
    }));
    this.lazyFlush();
    return this;
  }

  /**
   * 上报接口报错
   * msg: error.message
   * d1: version 当前cli版本
   * d2: username 用户名
   * d3: commandName 命令名
   * d4: apiName
   * c1: originArgs process.argv
   * c2: api 入参
   * c3: api 出参
   * 
   * @param apiName 接口名
   * @param errMsg 接口报错信息
   * @param params 接口入参
   * @param body 接口出参
   */
  public logApiError(apiName: EApiName, errMsg: string, params: any, body?: any): FrameworkMonitor {
    const pkgInfo = getCurrentPkgInfo();
    this.pendingLogItems.push(() => ({
      code: EMonitorCode.API_ERROR,
      msg: errMsg,
      d1: pkgInfo.version,
      d2: this.username,
      d3: this.commandName,
      d4: apiName,
      c1: process.argv,
      c2: JSON.stringify(params),
      c3: body,
    }));
    this.lazyFlush();
    return this;
  }

  /**
   * 上报首屏耗时
   * msg: version
   * d1: username 用户名
   * d2: commandName 命令名
   * m1: duration 最大耗时
   * m2: duration 平均耗时
   * m3:  duration 最小耗时
   * c1: originArgs process.argv
   * 
   * @param duration 首屏耗时
   */
  public logSplashScreen(duration: number): FrameworkMonitor {
    const pkgInfo = getCurrentPkgInfo();
    this.pendingLogItems.push(() => ({
      code: EMonitorCode.SPLASH_SCREEN,
      msg: pkgInfo.version,
      d1: this.username,
      d2: this.commandName,
      m1: duration,
      m2: duration,
      m3: duration,
      c1: process.argv,
    }));
    this.lazyFlush();
    return this;
  }

  /**
   * 上报接口调用次数
   * msg: apiName
   * d1: version 当前cli版本
   * d2: username 用户名
   * d3: commandName 命令名
   * c1: originArgs process.argv
   * @param apiName 
   */
  public logApiInvoke(apiName: EApiName): FrameworkMonitor {
    const pkgInfo = getCurrentPkgInfo();
    this.pendingLogItems.push(() => ({
      code: EMonitorCode.API_INVOKE,
      msg: apiName as unknown as string,
      d1: pkgInfo.version,
      d2: this.username,
      d3: this.commandName,
      c1: process.argv,
    }));
    this.lazyFlush();
    return this;
  }
}

const monitorMap: {
  [yuyanId: string]: FrameworkMonitor
} = {};

const getMonitor = (yuyanId: string) => {
  if (monitorMap[yuyanId]) return monitorMap[yuyanId];
  
  const cliArgsAndOptions = getCliArgsAndOptions();
  return new FrameworkMonitor({
    yuyanId,
    debug: cliArgsAndOptions.options.verbose,
  });
};

export default getMonitor;