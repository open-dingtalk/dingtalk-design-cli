import * as path from 'path';
import Scheduler from '../src/scheduler';
import { ECommandConfigProperty, ECommandName, ICommandConfigOpts, ICommandContext, IGlobalOptions, } from '../src/lib/common/types';
import { ICommandOptions, } from './mock/fakeCommand';
import * as cac from 'cac';
import config from '../src/lib/common/config';

/**
 * Scheduler用例确保通过process.argv转换后，command执行的上下文环境符合预期
 * 这里的上下文环境指的是 registerCommand参数ctx 以及 registerCommand.action参数options
 */
describe('Scheduler', ()=>{
  const cli = cac.default();
  const commandName = 'fakeCommand';
  const originalArgs = [
    '/usr/local/bin/node',
    '~/code/dingtalk-app-cli/packages/cli/dist/bin/dd.js',
    commandName,
    '--verbose'
  ];
  const { args, options, } = cli.parse(originalArgs);

  /**
   * 场景1: 包含ding.config.json，但不包含mini.project.json
   */
  describe('Miniprogram with ding.config.json, without mini.project.json', () => {
    const cwd = path.join(__dirname, './mock/mp1');
    const schedulerOpts = {
      cwd,
      verbose: true,
      commandArgs: args,
      commandOptions: options,
      commandRoot: path.join(__dirname, './mock'),
      yuyanId: '',
    };
    console.log('schedulerOpts', schedulerOpts);
    const scheduler = new Scheduler(schedulerOpts);
  
    it('check scheduler opts', () => {
      expect(scheduler.opts).toEqual(schedulerOpts);
    });
  
    /**
     * 校验scheduler中command context符合预期
     */
    it('check scheduler commandContext', () => {
      const dtdConfig = require(path.join(cwd, config.workspaceRcName));

      expect(scheduler.commandContext.cwd).toEqual(cwd);
      expect(scheduler.commandContext.commandName).toEqual('');
      expect(scheduler.commandContext.commandArgs).toEqual(schedulerOpts.commandArgs);
      expect(scheduler.commandContext.commandOptions).toEqual(schedulerOpts.commandOptions);
      expect(scheduler.commandContext.dtdConfig).toEqual(dtdConfig);
      expect(scheduler.commandContext.hasOriginDtdConfig).toEqual(true);
      expect(scheduler.commandContext.miniProgramConfigContent).toEqual({});
      expect(scheduler.commandContext.miniProgramConfigPath).toEqual('');
      expect(scheduler.commandContext.yuyanId).toEqual(schedulerOpts.yuyanId);
    });

    /**
     * 校验命令加载后，command action的上下文环境符合预期
     */
    it('check scheduler load command', async () => {
      // @ts-ignore
      const command = await scheduler.loadCommand(commandName);
      const registerCommandHook = command.getHook(ECommandConfigProperty.registerCommand);

      // @ts-ignore
      expect(command.commandContext.__proto__).toEqual(scheduler.commandContext);
      expect(command.commandContext.commandName).toEqual(commandName);
      expect(command.commandConfig.name).toEqual(commandName);
      expect(registerCommandHook).not.toBeUndefined();

      const commandConfigs = command.applyHook<ICommandConfigOpts>(
        ECommandConfigProperty.registerCommand,
      );
      const wrapper = await scheduler.getWrappedCommandAction(
        command,
        commandName as ECommandName,
        commandConfigs.action,
      );
      const cac = scheduler.registerCommand(command, commandConfigs);
      const { options, } = cac.parse(originalArgs, {
        run: false,
      });
      const res: {
        ctx: ICommandContext,
        options: ICommandOptions & IGlobalOptions
      } = await wrapper(options);

      expect(res.ctx).toEqual(command.commandContext); // 校验registerCommand参数ctx
      expect(res.options).toEqual({ // 校验registerCommand.action参数options
        ...schedulerOpts.commandOptions,
        cwd,
        test: '',
      });
    });
  });

  /**
   * 场景2: 包含ding.config.json，同时包含mini.project.json
   */
  describe('Miniprogram with ding.config.json, with mini.project.json', () => {
    const cwd = path.join(__dirname, './mock/mp2');
    const schedulerOpts = {
      cwd,
      verbose: true,
      commandArgs: args,
      commandOptions: options,
      commandRoot: path.join(__dirname, './mock'),
      yuyanId: '',
    };
    console.log('schedulerOpts', schedulerOpts);
    const scheduler = new Scheduler(schedulerOpts);
  
    it('check scheduler opts', () => {
      expect(scheduler.opts).toEqual(schedulerOpts);
    });
  
    /**
     * 校验scheduler中command context符合预期
     */
    it('check scheduler commandContext', () => {
      const dtdConfig = require(path.join(cwd, config.workspaceRcName));
      const miniProgramConfigPath = path.join(cwd, 'mini.project.json');
      const miniProgramConfigContent = require(miniProgramConfigPath);

      expect(scheduler.commandContext.cwd).toEqual(cwd);
      expect(scheduler.commandContext.commandName).toEqual('');
      expect(scheduler.commandContext.commandArgs).toEqual(schedulerOpts.commandArgs);
      expect(scheduler.commandContext.commandOptions).toEqual(schedulerOpts.commandOptions);
      expect(scheduler.commandContext.dtdConfig).toEqual(dtdConfig);
      expect(scheduler.commandContext.hasOriginDtdConfig).toEqual(true);
      expect(scheduler.commandContext.miniProgramConfigContent).toEqual(miniProgramConfigContent);
      expect(scheduler.commandContext.miniProgramConfigPath).toEqual(miniProgramConfigPath);
      expect(scheduler.commandContext.yuyanId).toEqual(schedulerOpts.yuyanId);
    });

    /**
     * 校验命令加载后，command action的上下文环境符合预期
     */
    it('check scheduler load command', async () => {
      // @ts-ignore
      const command = await scheduler.loadCommand(commandName);
      const registerCommandHook = command.getHook(ECommandConfigProperty.registerCommand);

      // @ts-ignore
      expect(command.commandContext.__proto__).toEqual(scheduler.commandContext);
      expect(command.commandContext.commandName).toEqual(commandName);
      expect(command.commandConfig.name).toEqual(commandName);
      expect(registerCommandHook).not.toBeUndefined();

      const commandConfigs = command.applyHook<ICommandConfigOpts>(
        ECommandConfigProperty.registerCommand,
      );
      const wrapper = await scheduler.getWrappedCommandAction(
        command,
        commandName as ECommandName,
        commandConfigs.action,
      );
      const cac = scheduler.registerCommand(command, commandConfigs);
      const { options, } = cac.parse(originalArgs, {
        run: false,
      });
      const res: {
        ctx: ICommandContext,
        options: ICommandOptions & IGlobalOptions
      } = await wrapper(options);

      expect(res.ctx).toEqual(command.commandContext); // 校验registerCommand参数ctx
      expect(res.options).toEqual({ // 校验registerCommand.action参数options
        ...schedulerOpts.commandOptions,
        cwd,
        test: '',
      });
    });
  });
});