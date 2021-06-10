import * as cac from 'cac';
import chalk from 'chalk';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import { ECommandConfigProperty, ECommandName, ICommandConfigOpts, PlainRecord, IDtdCLIDep, EDtdCLIKeyDep, IGlobalOptions, ICommandConfig, } from '../lib/common/types';
import CommandFactory from './command';
import { isPlainObject, } from 'lodash';
import {  getVersionLog, serializeCommandOption, } from './utils';
import CommandContextFactory from './context';
import suggestCommands from '../lib/util/suggestCommands';
import getCurrentPkgInfo from '../lib/util/getCurrentPkgInfo';
import performance from '../lib/util/performance';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';

const monitor = getMonitor(config.yuyanId);

export enum EPerformanceEvent {
  START = 'start',
  SPLASH_SCREEN = 'splashscreen'
}
export interface ISchedulerOpts {
  commandRoot: string;
  cwd?: string;
  verbose?: boolean;
  commandArgs: readonly string[];
  commandOptions: {
    [k: string]: any;
  }
  yuyanId: string;
}

export default class Scheduler {
  public opts: ISchedulerOpts
  private program: cac.CAC;
  public commandContext: CommandContextFactory;
  public commandList: CommandFactory[];

  constructor(opts: ISchedulerOpts) {
    performance.tick(EPerformanceEvent.START);

    this.opts = opts;
    this.commandList = [];
    this.program = cac.cac();
    this.commandContext = new CommandContextFactory(
      opts.cwd || process.cwd(), 
      opts.yuyanId,
      opts.commandArgs,
      opts.commandOptions,
      opts.verbose,
    );

    logger.debug('scheduler factory opts', this.opts);
    logger.debug('scheduler commandContext', this.commandContext);
  }

  /**
   * 初始化全局参数默认值
   * @param originOpts 命令行传入的参数
   * @returns 
   */
  private generateActionOptions(originOpts: {
    [k: string]: any;
  } & IGlobalOptions) {
    return {
      ...originOpts,
      cwd: this.commandContext.cwd,
      verbose: this.opts.verbose,
    };
  }

  getWrappedCommandAction(
    command: CommandFactory,
    commandName: ECommandName,
    action: (...args: any[]) => void
  ) {
    return async (...callbackArgs: any[]): Promise<any> => {
      monitor.logPv();

      let args: string[];
      let opts: Partial<any> & PlainRecord;

      if (callbackArgs.length === 1) {
        args = [];
        opts = callbackArgs[0];
      } else {
        args = callbackArgs.slice(0, callbackArgs.length - 1) as string[];
        opts = callbackArgs[callbackArgs.length - 1];
      }

      opts = this.generateActionOptions(opts);

      logger.debug(`command ${commandName} action options`, opts);

      this.trackSplashScreen();

      return await action(opts, command.commandContext);
    };
  }

  public loadCommand(name: ECommandName): CommandFactory {
    const command = new CommandFactory({
      name, 
      ctx: this.commandContext,
      root: this.opts.commandRoot,
    });
    this.commandList.push(command);
    return command;
  }

  registerCommandByCac(commandInst: CommandFactory, commandConfig: ICommandConfigOpts) {
    const { program, } = this;
    const { command, options, action, } = commandConfig;
    const currentCommand = program.command(command.name, command.description);

    if (options) {
      Object.keys(options).forEach(optionName => {
        const { name: _name, description, config, } = serializeCommandOption(optionName, options[optionName] || {});
        currentCommand.option(_name, description, config);
      });
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
    return program;
  }

  public applyCommandsHook(name: ECommandConfigProperty): void {
    switch (name) {
    case ECommandConfigProperty.registerCommand:
      this.commandList.forEach(commandInst => {
        const { program, } = this;

        if (typeof commandInst.getHook(ECommandConfigProperty.registerCommand) === 'function') {
          const commandConfigs = commandInst.applyHook<ICommandConfigOpts>(
            ECommandConfigProperty.registerCommand,
          );

          const normalizedcommandConfigs: ICommandConfigOpts[]
              = Array.isArray(commandConfigs) ? commandConfigs : [commandConfigs];

          normalizedcommandConfigs.forEach(commandConfig => {
            this.registerCommandByCac(commandInst, commandConfig);
          });
        }
      });
      break;
    default:
      break;
    }
  }

  private trackSplashScreen() {
    performance.tick(EPerformanceEvent.SPLASH_SCREEN);

    const splashScreenDuration = performance.interval(
      EPerformanceEvent.START,
      EPerformanceEvent.SPLASH_SCREEN,
    );

    logger.debug(chalk.bgRedBright('splashScreenDuration'), splashScreenDuration);
    monitor.logSplashScreen(splashScreenDuration).lazyFlush();
  }

  private async logVersion() {
    const pkgInfo = getCurrentPkgInfo();
    const deps: IDtdCLIDep[] = [{
      name: EDtdCLIKeyDep.cli,
      version: pkgInfo.version,
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
  public async bootstrap(): Promise<void> {
    await this.loadCommand(ECommandName.init);
    await this.loadCommand(ECommandName.upload);
    await this.loadCommand(ECommandName.lint);
    await this.loadCommand(ECommandName.dev);
    await this.loadCommand(ECommandName.preview);
    await this.bootstrapProgram();
  }

  /**
   * 登记全局配置
   */
  private async bootstrapProgram() {
    const pkgInfo = getCurrentPkgInfo();
    const pkgName = pkgInfo.name;
    const pkgVersion = pkgInfo.version;
    logger.debug(`${pkgName}@${pkgVersion}`);
    logger.debug('origin process args', process.argv);
    
    this.program.name = 'dd';
    this.program.option('--cwd [cwd]', `当前的工作目录, 默认值是 ${chalk.yellow('process.cwd()')}`);
    this.program.option('--verbose', '打开框架日志调试');

    await this.applyCommandsHook(ECommandConfigProperty.registerCommand);

    const { options, } = this.program.parse(process.argv, { run: false, });
    if (options.v || options.version) {
      return this.logVersion();
    }

    if (options.help || options.h) {
      this.trackSplashScreen();
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

      const commandName = this.commandContext.commandArgs[0];
      commandName && suggestCommands(commandName, this.commandList.map(v => v.commandContext.commandName || ''));
    }
  }
}