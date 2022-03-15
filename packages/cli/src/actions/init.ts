import yeomanRuntime from 'yeoman-environment';
import chalk from 'chalk';
import * as path from 'path';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';
import { logger, } from '../lib/cli-shared-utils/lib/logger';

interface IOpts {
  cwd?: string;
  outDir?: string;
  appType?: string;
  template?: string;
  'skip-install'?: boolean;
  language?: string;
}
interface IResponse {}

const monitor = getMonitor(config.yuyanId);

export default async (options: IOpts): Promise<IResponse> => {
  return new Promise((res, rej) => {
    const env = yeomanRuntime.createEnv();
    const {
      cwd = '',
      outDir = '',
    } = options;
    const done = (err)=>{
      if (err) {
        monitor.logJSError(err);
        rej(err);
      } else {
        logger.success(`初始化完成，请 ${chalk.yellow(`cd ${path.resolve(cwd, outDir)}`)} 进入工作目录，接下来可以使用 ${chalk.yellow('ding dev')} 进行开发调试`);
        res(null);
      }
    };
    // @ts-ignore
    env.lookup(function () {
      logger.debug('GeneratorsMeta', env.getGeneratorsMeta());
      env.run(`${config.generatorNamespace} ${outDir || ''}`, {
        appType: options['appType'],
        template: options['template'],
        language: options['language'],
        outDir: outDir || './',
        'skip-install': options['skipInstall'],
      }, done);
    });
  });
};