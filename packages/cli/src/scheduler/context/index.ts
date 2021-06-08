import FrameworkMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { Watcher, } from '../../lib/cli-shared-utils/lib/watcher';
import { EAppType, ICommandContext, IMiniProjectJson, IWorkspaceRc, } from '../../lib/common/types';
import { getCliArgsAndOptions, } from '../utils';
import * as path from 'path';
import * as fs from 'fs';
import getJson from '../../lib/util/getJson';
import getMiniProjectJson from '../../lib/util/getMiniProjectJson';
import { Logger, } from '../../lib/cli-shared-utils/lib/logger';
import config from '../../lib/common/config';

export default class CommandContextFactory implements ICommandContext {
  public commandArgs: ReadonlyArray<string>;
  public commandOptions: {
    [k: string]: any;
  };
  public monitor: FrameworkMonitor;
  public hasOriginDtdConfig: boolean;
  public watcher: Watcher;
  public miniprogramConfigPath: string;

  private _commandName: string;
  private _logger: Logger;
  private _dtdConfig: IWorkspaceRc;
  private _mpConfigContent: IMiniProjectJson;

  get dtdConfig(): IWorkspaceRc {
    return this._dtdConfig;
  }

  get logger(): Logger {
    return this._logger;
  }

  get commandName(): string {
    return this._commandName || '';
  }

  get miniProgramConfigContent(): IMiniProjectJson {
    return this._mpConfigContent;
  }

  constructor(
    public cwd: string,
    public yuyanId: string
  ) {
    const commandArgsAndOptions = getCliArgsAndOptions();
    const monitor = new FrameworkMonitor({
      yuyanId,
    });

    this.commandArgs = commandArgsAndOptions.args;
    this.commandOptions = commandArgsAndOptions.options;
    this.monitor = monitor;
    
    const { dtdConfig, hasOriginDtdConfig, } = this.generateDtdConfig();
    this._dtdConfig = dtdConfig;
    this.hasOriginDtdConfig = hasOriginDtdConfig;

    const mpConfig = this.getMiniProgramConfig();
    this._mpConfigContent = mpConfig.content;
    this.miniprogramConfigPath = mpConfig.path;

    const watcher = new Watcher({
      cwd,
      files: [],
    });
    this.watcher = watcher;
  }

  public setDtdConfig(dtdConfig: IWorkspaceRc) {
    this._dtdConfig = dtdConfig;
  }

  public setLogger(logger: Logger) {
    this._logger = logger;
  }

  public setCommandName(commandName: string) {
    this._commandName = commandName;
  }

  public setMiniProgramConfig(mpConfigContent: IMiniProjectJson) {
    this._mpConfigContent = mpConfigContent;
  }

  private generateDtdConfig() {
    const cwd = this.cwd;
    const configPath = path.join(cwd, config.workspaceRc);
    let hasOriginDtdConfig = false;
    let dtdConfig: IWorkspaceRc;

    if (fs.existsSync(configPath)) {
      hasOriginDtdConfig = true;
      dtdConfig = getJson(configPath, true, {});
    } else {
      // TODO: 不支持存量项目
    }

    return {
      hasOriginDtdConfig,
      dtdConfig,
    };
  }
    
  private getMiniProgramConfig() {
    const miniProjectJson = getMiniProjectJson();
    return miniProjectJson;
  }
}