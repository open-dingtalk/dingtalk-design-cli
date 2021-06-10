import FrameworkMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { Watcher, } from '../../lib/cli-shared-utils/lib/watcher';
import { EAppType, ECommandName, ICommandContext, IMiniProjectJson, IWorkspaceRc, } from '../../lib/common/types';
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
    public cwd: string,
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
    this._dtdConfig = dtdConfig;
    this.hasOriginDtdConfig = hasOriginDtdConfig;

    const mpConfig = this.getMiniProgramConfig();
    this._mpConfigContent = mpConfig.content;
    this.miniProgramConfigPath = mpConfig.path;

    const watcher = new Watcher({
      cwd,
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
    const cwd = this.cwd;
    const configPath = path.join(cwd, config.workspaceRc);
    let hasOriginDtdConfig = false;
    let dtdConfig: IWorkspaceRc;

    if (fs.existsSync(configPath)) {
      hasOriginDtdConfig = true;
      dtdConfig = getJson(configPath, true, {});
    } else {
      // TODO: 不支持存量项目，要提示一下
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
}