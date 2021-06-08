import { EDtdCLIKeyDep, ICommandOptionConfig, IDtdCLIDep, } from '../lib/common/types';
import * as cac from 'cac';
import * as path from 'path';
import chalk from 'chalk';
import { getLogger, } from '../lib/cli-shared-utils/lib/logger';
import { ISchedulerOpts, } from './index';
import getJson from '../lib/util/getJson';
import config from '../lib/common/config';

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
    description: config.description,
    config: {
      default: config.default,
    },
  };
}

export function getCliArgsAndOptions() {
  const cli = cac.default();
  const parsed = cli.parse();
  return {
    options: parsed.options,
    args: parsed.args,
  };
}

export function getSchedulerOptionsFromProcessArgv(commandRoot): ISchedulerOpts {
  const logger = getLogger('bin/dd');
  const { args, options, } = getCliArgsAndOptions();
  logger.debug('cli args', args);
  logger.debug('cli options', options);

  const {
    verbose,
    cwd,
  } = options;

  return {
    cwd,
    verbose,
    commandArgs: args,
    commandOptions: options,
    commandRoot,
  };
}

export function getPackageJson(packagePath: string) {
  return getJson(packagePath, true, {});
}




export async function getVersionLog(pkgs: IDtdCLIDep[]): Promise<{
  name: EDtdCLIKeyDep;
  version?: string;
}[]> {
  return await Promise.all(pkgs.map(async pkg => {
    if (pkg.version) {
      return pkg;
    }

    if (pkg.name === EDtdCLIKeyDep.cli) {
      const pkgJson = require('../../package.json');
      const pkgVersion = pkgJson.version;

      return {
        name: EDtdCLIKeyDep.cli,
        version: pkgVersion,
      };
    } else if (pkg.name === EDtdCLIKeyDep.generator) {
      const yeomanRuntime = require('yeoman-environment');
      const env = yeomanRuntime.createEnv();
      const metas = await new Promise(res=>{
        env.lookup(function () {
          res(env.getGeneratorsMeta());
        });
      });
      const meta = metas[config.generatorNamespace];
      const generatorPkgJson = getPackageJson(path.join(meta.packagePath, 'package.json'));
  
      return {
        name: EDtdCLIKeyDep.generator,
        version: generatorPkgJson.version || 'N/A',
      };

    } else {
      const name = path.normalize(pkg.name);
      const mainPath = require.resolve(name, {
        paths: [
          process.cwd(),
          ...module.paths,
        ],
      });
      const pkgIdx = mainPath.lastIndexOf(name) + name.length;
      const depPath = mainPath.slice(0, pkgIdx);
      const pkgJsonPath = path.join(depPath, 'package.json');
      const pkgJson = getJson(pkgJsonPath, true, {});
      return {
        name: pkg.name,
        version: pkgJson.version || 'N/A',
      };
    }
  }));
}