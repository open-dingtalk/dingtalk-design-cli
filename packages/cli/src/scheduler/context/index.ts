import { Watcher, } from '../../lib/cli-shared-utils/lib/watcher';
import { EAppType, ECommandName, EStdioCommands, ICommandContext, IMiniProjectJson, IWorkspaceRc, } from '../../lib/common/types';
import * as path from 'path';
import * as fs from 'fs';
import getJson from '../../lib/util/getJson';
import getMiniProjectJson from '../../lib/util/getMiniProjectJson';
import { Logger, logger, } from '../../lib/cli-shared-utils/lib/logger';
import config from '../../lib/common/config';

export default class CommandContextFactory implements ICommandContext {
  public hasOriginDtdConfig: boolean;
  public watcher: Watcher;
  public miniProgramConfigPath: string;
  public cwd: string;

  private _commandName: ECommandName | '';
  private _logger: Logger;
  private _dtdConfig: IWorkspaceRc;
  private _mpConfigContent: IMiniProjectJson;

  get dtdConfig(): IWorkspaceRc {
    return this._dtdConfig;
  }

  get logger(): Logger {
    return this._logger;
  }

  get commandName(): ECommandName | '' {
    return this._commandName;
  }

  get miniProgramConfigContent(): IMiniProjectJson {
    return this._mpConfigContent;
  }

  constructor(
    public originCwd: string,
    public yuyanId: string,
    public commandArgs: readonly string[],
    public commandOptions: {
      [k: string]: any;
    },
    public verbose: boolean
  ) {
    this._commandName = '';
    this._logger = logger;
    this.commandArgs = commandArgs;
    this.commandOptions = commandOptions;
    
    const { dtdConfig, hasOriginDtdConfig, } = this.getDtdConfig();
    this.cwd = path.join(originCwd, dtdConfig.base || './');
    this._dtdConfig = dtdConfig;
    this.hasOriginDtdConfig = hasOriginDtdConfig;

    const mpConfig = this.getMiniProgramConfig();
    this._mpConfigContent = mpConfig.content;
    this.miniProgramConfigPath = mpConfig.path;

    const watcher = new Watcher({
      cwd: this.cwd,
      files: [],
    });
    this.watcher = watcher;
  }
  monitor: any;

  public setDtdConfig(dtdConfig: IWorkspaceRc) {
    this._dtdConfig = dtdConfig;
  }

  public setLogger(logger: Logger) {
    this._logger = logger;
  }

  public setCommandName(commandName: ECommandName) {
    this._commandName = commandName;
  }

  public setMiniProgramConfig(mpConfigContent: IMiniProjectJson) {
    this._mpConfigContent = mpConfigContent;
  }

  private getDtdConfig() {
    const originCwd = this.originCwd;
    const configPath = path.join(originCwd, config.workspaceRcName);
    let hasOriginDtdConfig = false;
    let dtdConfig: IWorkspaceRc;

    if (fs.existsSync(configPath)) {
      hasOriginDtdConfig = true;
      dtdConfig = getJson(configPath, true, {});
    } else {
      dtdConfig = {
        type: '',
      };
    }

    return {
      hasOriginDtdConfig,
      dtdConfig,
    };
  }
    
  private getMiniProgramConfig() {
    const cwd = this.cwd;
    const miniProjectJson = getMiniProjectJson(cwd);
    return miniProjectJson;
  }

  /**
   * 引导客户获取应用的miniAppId和token
   */
  public logTips(appType: EAppType, commandName: EStdioCommands): void {
    if ([EAppType.MP, EAppType.PLUGIN].indexOf(appType) === -1) return;
    const isDevCommand = this._commandName === ECommandName.dev;

    this._logger.info(`
    「如何获取miniAppId」
    1. 登录开发者后台 https://open-dev.dingtalk.com/
    ${appType === EAppType.MP 
    ? '2. 选中一个小程序，在基础信息界面可以看到小程序的miniAppId'
    : '2. 进入页面 https://open-dev.dingtalk.com/v1/fe/old#/plugin，可以获取工作台组件的miniAppId'}
    3. 拿到miniAppId后，${isDevCommand ? '在当前命令行输入「updateConfig miniAppId <miniAppId> + 回车」进行配置更新' : `更新配置文件${config.workspaceRcName}中的miniAppId字段`}

    「如何获取API Token」
    1. 参考开发者文档 https://developers.dingtalk.com/document/app/used-to-obtain-the-application-authorization-without-api-token
    2. 拿到token后，${isDevCommand ? '在当前命令行输入「updateConfig token <token> + 回车」进行配置更新' : `更新配置文件${config.workspaceRcName}中的token字段`}
    
    在设置好miniAppId和token之后，在当前命令行输入「${commandName} + 回车」 即可正常使用
    `);
  }
}