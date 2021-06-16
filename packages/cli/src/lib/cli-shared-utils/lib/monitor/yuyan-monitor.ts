import urllib, { RequestOptions, } from 'urllib';
import * as monitorUtils from './monitor-utils';
import * as util from './util';

const serverUrl = 'https://mdap.alipay.com/loggw/dwcookieLogGet.do';
const version = '0.1.10';

function getGlobal() {
  if (!eval) {
    return global || window;
  }
  return ((0, eval)('this'));
}

export interface ILogItem {
  code: number;
  msg: string;
}

interface IMonitor {
  log(logItem: ILogItem): void;
}

// export enum FrameworkMonitorCodeEnum {
//   Error = 1,
//   PV = 11,
//   Dependency = 12,
//   DevDependency = 13,
//   UserConfig = 14,
//   SplashScreen = 15,
//   NonImpl_16 = 16,
//   Performance = 17,
// }

export interface IMonitorOpts {
  yuyanId?: string;
  _appId?: string;
  env?: any;
}

export default class Monitor implements IMonitor {
  private eventId: string;
  private logCache: any[];
  private _warn: (...args: any[]) => void;
  private userConfig: any;
  private debug: boolean;
  private appid: string;
  private beforeLog: (...args: any[]) => void;
  private defaults: any; 
  private requiredFields: any; 

  constructor(_opts: IMonitorOpts = {}) {
    this.eventId = '102022'; // PC 端监控事件
    this.logCache = [];
    this.userConfig = {};
    this._warn = (...args) => {
      const win = getGlobal();
      if (typeof win === 'object' &&
            win.console &&
            typeof win.console.warn === 'function' &&
            this.debug) {
        const params = Array.prototype.slice.call(args);
        win.console.warn.apply(null, [`[Monitor Debug]${params[0]}`, params.slice(1)]);
      }
    };
    const opts = monitorUtils.getOptionsDefaulter().process(_opts);
    this.userConfig = opts;
    this.appid = opts.bmAppid;
    this.debug = opts.debug;
    this.beforeLog = opts.beforeLog;
    this.defaults = opts.defaults || {};
    this.requiredFields = opts.requiredFields;
  }

  public async log(logItem: ILogItem): Promise<void> {
    const itemList = Array.isArray(logItem) ? logItem : [logItem];
    Promise.all(itemList.map(item => this._log(item)));
  }

  /**
     * 将上报值添加上必要的参数，并转化为日志格式
     * @param item
     */
  private parseItem(item) {
    if (!item || typeof item !== 'object') {
      return [];
    }
    // 处理日期
    const dt = new Date();
    // 时间格式补零
    const fillDate = num => (num < 10 ? `0${num}` : `${num}`);
    // 处理用户ID
    const userId = item.userId || item.roleId || this.userConfig.userId || '';
    delete item.roleId;
    delete item.userId;
    let param4 = Object.assign(Object.assign({}, this.defaults), item);
    if (this.appid) {
      param4.bm_appid = this.appid;
    }
    if (!monitorUtils.allFieldsReady(this.userConfig, this.requiredFields, this._warn.bind(this))) {
      this.logCache.push(item);
      return null;
    }
    if (this.userConfig.sprintId)
      param4.bm_sid = this.userConfig.sprintId;
    if (this.userConfig.env)
      param4.env = this.userConfig.env;
    if (this.userConfig.yuyanId)
      param4.yuyan_id = this.userConfig.yuyanId;
    param4.tracert_ver = version;
    if (this.beforeLog && typeof this.beforeLog === 'function') {
      param4 = this.beforeLog(param4);
      if (!param4 || typeof param4 !== 'object') {
        this._warn('beforeLog返回值不是对象，不进行上报');
        return null;
      }
    }
    const data = [
      'D-AE',
      `${dt.getFullYear()}-${fillDate(dt.getMonth() + 1)}-${fillDate(dt.getDate())} ${fillDate(dt.getHours())}:${fillDate(dt.getMinutes())}:${fillDate(dt.getSeconds())}:${dt.getMilliseconds()}`,
      '',
      '',
      '2',
      '',
      '',
      userId,
      '1000',
      this.eventId,
      'H5behavior',
      '2',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ];
    data.push(util.objToStr(param4, '^', true));
    return data;
  }

  private async _log(logItem) {
    const logData = this.parseItem(logItem);
    if (!logData || !logData.length) {
      return;
    }
    return this.sendRequest(logData);
  }

  private sendRequest(data) {
    const sendData = `data=${encodeURIComponent(data.join())}&time=${new Date().getTime()}`;
    const options: RequestOptions = {
      method: 'POST',
      content: sendData,
      headers: {
        'Sec-Fetch-Mode': 'cors',
        'Content-type': 'application/x-www-form-urlencoded',
      },
    };
    const res =  urllib.request(serverUrl, options);
    return res;
  }
}