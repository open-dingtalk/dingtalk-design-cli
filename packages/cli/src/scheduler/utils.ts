import { EDtdCLIKeyDep, ICommandOptionConfig, IDtdCLIDep, } from '../lib/common/types';
import * as path from 'path';
import chalk from 'chalk';
import { getLogger, } from '../lib/cli-shared-utils/lib/logger';
import { ISchedulerOpts, } from './index';
import getJson from '../lib/util/getJson';
import config from '../lib/common/config';
import Environment from 'yeoman-environment';
import getCurrentPkgInfo from '../lib/util/getCurrentPkgInfo';
import getCliArgsAndOptions from '../lib/util/getCliArgsAndOptions';

/**
 * Serialize command option to CAC option.
 */
export function serializeCommandOption(
  name: string,
  config: ICommandOptionConfig,
): {
  name: string;
  description: string;
  config: {
    default: any;
  };
} {
  let serializedName = `--${name}`;
  if (config.shortcut) {
    serializedName = `-${config.shortcut}, ${serializedName}`;
  }
  if (config.type === 'string') {
    if (config.requiredValue !== false) {
      serializedName += ` <${name}>`;
    } else {
      serializedName += ` [${name}]`;
    }
  }
  return {
    name: serializedName,
    description: config.description || '',
    config: {
      default: config.default,
    },
  };
}

export function getSchedulerOptionsFromProcessArgv(): {
  cwd: string;
  verbose: boolean;
  commandArgs: ISchedulerOpts['commandArgs'];
  commandOptions: ISchedulerOpts['commandOptions'];
  } {
  const logger = getLogger('bin/dd');
  const { args, options, } = getCliArgsAndOptions();
  logger.debug('cli args', args);
  logger.debug('cli options', options);

  const {
    verbose,
    cwd,
  } = options;

  return {
    cwd: cwd || process.cwd(),
    verbose,
    commandArgs: args,
    commandOptions: options,
  };
}

export function getPackageJson(packagePath: string) {
  return getJson(packagePath, true, {});
}

export async function getVersionLog(pkgs: IDtdCLIDep[]): Promise<{
  name: EDtdCLIKeyDep;
  version?: string;
  path?: string;
}[]> {
  return await Promise.all(pkgs.map(async pkg => {
    if (pkg.version) {
      return pkg;
    }

    if (pkg.name === EDtdCLIKeyDep.cli) {
      const pkgInfo = getCurrentPkgInfo();
      return {
        name: EDtdCLIKeyDep.cli,
        version: pkgInfo.version,
      };
    } else if (pkg.name === EDtdCLIKeyDep.generator) {
      const yeomanRuntime = require('yeoman-environment');
      const env: Environment = yeomanRuntime.createEnv();
      const metas: Record<string, Environment.GeneratorMeta> = await new Promise(res=>{
        // @ts-ignore
        env.lookup(function () {
          res(env.getGeneratorsMeta());
        });
      });
      const meta = metas[config.generatorNamespace];
      const generatorPkgJson = getPackageJson(path.join(meta.packagePath, 'package.json'));
  
      return {
        name: EDtdCLIKeyDep.generator,
        version: generatorPkgJson.version || 'N/A',
        path: meta.packagePath,
      };
    } else {
      const name = path.normalize(pkg.name);
      try {
        const mainPath = require.resolve(`${name}/package.json`, {
          paths: [
            process.cwd(),
            ...module.paths,
          ],
        });
        const pkgJson = getJson(mainPath, true, {});
        return {
          name: pkg.name,
          version: pkgJson.version || 'N/A',
          path: path.dirname(mainPath),
        };
      } catch(e) {
        return {
          name: pkg.name,
          version: 'N/A',
          path: '',
        };
      }
      
    }
  }));
}