import yeomanRuntime from 'yeoman-environment';
import CommandWrapper from '../../scheduler/command/commandWrapper';
import config from '../../lib/common/config';
import { ECommandName, } from '../../lib/common/types';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import chalk from 'chalk';
import * as path from 'path';

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
      command: {
        name: ECommandName.init,
        description: '创建一个钉钉应用，可以是小程序、h5、工作台组件',
      },
      options: {
        appType: {
          description: '[可选] 指定应用类型，值可以为miniprogram | h5 | plugin',
          type: 'string',
          shortcut: 'a',
        },
        template: {
          description: '[可选] 指定模版，模版的key可以从 https://github.com/open-dingtalk/dd-application-template 上查阅，如：plugin_default，则模版key为default',
          type: 'string',
          shortcut: 't',
        },
        language: {
          description: '[可选] 指定模版语言，值可以为javascript | typescript（有些模版可能没有typescript语言版本）',
          type: 'string',
          shortcut: 'l',
        },
        'skip-install': {
          description: '[可选] 若指定则不自动安装依赖',
          type: 'string',
        },
        outDir: {
          description: '[可选] 输出目录，若不指定时，将默认在当前目录新建',
          type: 'string',
          shortcut: 'o',
        },
      },
      action: async (options) => {
        ctx.logger.debug('cli options', options);
        const env = yeomanRuntime.createEnv();
        const {
          outDir,
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