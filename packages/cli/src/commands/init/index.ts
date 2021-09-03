import yeomanRuntime from 'yeoman-environment';
import CommandWrapper from '../../scheduler/command/commandWrapper';
import config from '../../lib/common/config';
import { ECommandName, } from '../../lib/common/types';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import chalk from 'chalk';
import * as path from 'path';
import commandsConfig from '../commandsConfig';

interface ICommandOptions {
  appType?: string;
  template?: string;
  language?: string;
  'skip-install'?: boolean;
  outDir?: string;
}

const monitor = getMonitor(config.yuyanId);

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.init,
  registerCommand(ctx) {
    return {
      ...commandsConfig.init,
      action: async (options) => {
        ctx.logger.debug('cli options', options);
        const env = yeomanRuntime.createEnv();
        const {
          outDir = '',
        } = options;
        const done = (err)=>{
          if (err) {
            monitor.logJSError(err);
          } else {
            ctx.logger.success(`初始化完成，请 ${chalk.yellow(`cd ${path.resolve(ctx.cwd, outDir)}`)} 进入工作目录，接下来可以使用 ${chalk.yellow('ding dev')} 进行开发调试`);
          }
        };
        // @ts-ignore
        env.lookup(function () {
          ctx.logger.debug('GeneratorsMeta', env.getGeneratorsMeta());
          env.run(`${config.generatorNamespace} ${outDir || ''}`, {
            appType: options['appType'],
            template: options['template'],
            language: options['language'],
            outDir: outDir || './',
            'skip-install': options['skipInstall'],
          }, done);
        });
      },
    };
  },
});