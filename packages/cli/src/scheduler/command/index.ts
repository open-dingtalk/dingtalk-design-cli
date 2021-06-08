import { getLogger, } from '../../lib/cli-shared-utils/lib/logger';
import { ICommandConfig, ECommandConfigProperty, PlainRecord, ICommandContext, } from '../../lib/common/types';
import { resolveCommand, } from './commandLoader';
import chalk from 'chalk';

export default class Command<CO = PlainRecord> {
  public commandConfig: ICommandConfig<CO>;
  public commandContext: ICommandContext<CO>;

  constructor(opts: {
    name: string;
    ctx: ICommandContext<CO>;
    root: string;
  }) {
    const timeStart = Date.now();

    this.commandConfig = resolveCommand<CO>(opts.name, opts.root);
    this.commandContext = Object.create(opts.ctx);
    this.commandContext.setCommandName(opts.name);
    this.commandContext.setLogger(getLogger(`bin/dd ${opts.name}`));

    const timeEnd = Date.now();
    this.commandContext.logger.debug(`load command ${opts.root}/${opts.name} (${chalk.yellowBright(timeEnd - timeStart)}ms)`);
  }

  /**
   * 获取钩子
   *
   * @param name
   */
  public getHook<K extends ECommandConfigProperty>(name: K): (ICommandConfig<CO>[K]) {
    return this.commandConfig[name];
  }

  /**
   * 运行钩子
   *
   * @param name
   * @param args
   */
  public applyHook<T>(name: ECommandConfigProperty, ...args: unknown[]): T {
    const hook = this.commandConfig[name];
    if (typeof hook === 'function') {
      // @ts-ignore TODO
      return hook(this.commandContext, ...args);
    }
    throw new Error(`Invalid call: ${name}`);
  }
}