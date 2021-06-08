import * as cac from 'cac';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import { resolveCommand, } from './command/commandLoader';
import { ECommandConfigProperty, ECommandName, ICommandConfig, ICommandConfigOpts, PlainRecord, ICommandContext, IWorkspaceRc, EAppType, IDtdCLIDep, EDtdCLIKeyDep, } from '../lib/common/types';
import CommandFactory from './command';
import { isPlainObject, } from 'lodash';
import { getCliArgsAndOptions, getPackageJson, getVersionLog, serializeCommandOption, } from './utils';
import FrameworkMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { ELoggerLevel, } from '../lib/cli-shared-utils/lib/logger/types';
import config from '../lib/common/config';
import yeomanRuntime from 'yeoman-environment';
import getJson from '../lib/util/getJson';
import getMiniProjectJson from '../lib/util/getMiniProjectJson';
import { Watcher, } from '../lib/cli-shared-utils/lib/watcher';
import CommandContextFactory from './context';

export interface ISchedulerOpts {
  commandRoot: string;
  cwd?: string;
  verbose?: boolean;
  commandArgs: readonly string[];
  commandOptions: {
    [k: string]: any;
  }
  yuyanId?: string;
}

export default class Scheduler {
  private opts: ISchedulerOpts
  private program: cac.CAC;
  private commandContext: CommandContextFactory;
  public commandList: CommandFactory[];

  constructor(opts: ISchedulerOpts) {
    this.opts = opts;

    this.commandList = [];
    
    this.commandContext = new CommandContextFactory(opts.cwd || process.cwd(), opts.yuyanId);

    logger.debug('scheduler factory opts', this.opts);
    logger.debug('scheduler commandContext', this.commandContext);
  }

  private getWrappedCommandAction(
    command: CommandFactory,
    commandName: ECommandName,
    action: (...args: any[]) => void
  ) {
    return async (...callbackArgs: any[]) => {
      let args: string[];
      let opts: Partial<any> & PlainRecord;

      if (callbackArgs.length === 1) {
        args = [];
        opts = callbackArgs[0];
      } else {
        args = callbackArgs.slice(0, callbackArgs.length - 1) as string[];
        opts = callbackArgs[callbackArgs.length - 1];
      }

      opts.cwd = opts.cwd || this.opts.cwd;

      await action(opts, command.commandContext);
    };
  }

  private loadCommand(name: ECommandName) {
    const command = new CommandFactory({
      name, 
      ctx: this.commandContext,
      root: this.opts.commandRoot,
    });
    this.commandList.push(command);
  }

  private applyCommandsHook(name: ECommandConfigProperty) {
    switch (name) {
    case ECommandConfigProperty.registerCommand:
      this.commandList.forEach(commandInst => {
        const { program, } = this;

        if (typeof commandInst.getHook(ECommandConfigProperty.registerCommand) === 'function') {
          const commandConfigs = commandInst.applyHook<ICommandConfigOpts[]>(
            ECommandConfigProperty.registerCommand,
          );

          const normalizedcommandConfigs: ICommandConfigOpts[]
              = Array.isArray(commandConfigs) ? commandConfigs : [commandConfigs];

          normalizedcommandConfigs.forEach(commandConfig => {
            const { command, options, action, } = commandConfig;
            const currentCommand = program.command(command.name, command.description);

            if (isPlainObject(options)) {
              Object.keys(options).forEach(optionName => {
                const { name: _name, description, config, } = serializeCommandOption(optionName, options[optionName]);
                currentCommand.option(_name, description, config);
              });
            } else if (Array.isArray(options)) {
              throw new Error('options has been moved to plain object in minifish.');
            }

            const commandName = command.name.split(' ')[0] as ECommandName; // 若 command 配置为 dev [entry], 则 command name 为 dev
            currentCommand.allowUnknownOptions();
            currentCommand.action(
              this.getWrappedCommandAction(
                commandInst,
                commandName,
                action,
              ),
            );
          });
        }
      });
      break;
    default:
      break;
    }
  }

  private async logVersion() {
    const pkgJson = require('../../package.json');
    const pkgVersion = pkgJson.version;
    const deps: IDtdCLIDep[] = [{
      name: EDtdCLIKeyDep.cli,
      version: pkgVersion,
    }, {
      name: EDtdCLIKeyDep.generator,
      version: '',
    }, {
      name: EDtdCLIKeyDep.opensdk,
      version: '',
    }, {
      name: EDtdCLIKeyDep.validateScript,
      version: '',
    }];

    const depInfo = await getVersionLog(deps);
    console.log(`${depInfo.map(dep=> `- ${dep.name}: ${chalk.yellow(dep.version)}`).join('\n')}`);
  }

  /**
   * 登记全局options
   * 登记命令
   * 初始化配置和监控等实例
   */
  async bootstrap() {
    await this.loadCommand(ECommandName.init);
    await this.loadCommand(ECommandName.upload);
    await this.loadCommand(ECommandName.lint);
    await this.loadCommand(ECommandName.dev);
    await this.bootstrapProgram();
  }

  /**
   * 登记全局配置
   */
  async bootstrapProgram() {
    const pkgJson = require('../../package.json');
    const pkgName = pkgJson.name;
    const pkgVersion = pkgJson.version;
    logger.debug(`${pkgName}@${pkgVersion}`);

    this.program = cac.cac();
    this.program.name = 'dd';
    this.program.option('--cwd [cwd]', `当前的工作目录, 默认值是 ${chalk.yellow('process.cwd()')}`);
    this.program.option('--verbose', '打开框架日志调试');

    await this.applyCommandsHook(ECommandConfigProperty.registerCommand);

    const { options, } = this.program.parse(process.argv, { run: false, });
    if (options.v || options.version) {
      return this.logVersion();
    }

    if (options.help || options.h) {
      // this.tractSplashScreen();
      this.program.outputHelp();
    } else if (this.program.matchedCommand) {
      logger.debug('matchedCommand', this.program.matchedCommand.name);
      try {
        await this.program.runMatchedCommand();
      } catch (error) {
        console.log(chalk.gray(`Error occurred on "${this.program.matchedCommandName}" command`));
        throw error;
      }
    } else {
      this.program.outputHelp();
    }
    
  }
}