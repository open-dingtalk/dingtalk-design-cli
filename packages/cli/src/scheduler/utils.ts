import { ICommandOptionConfig, } from '../lib/common/types';
import * as cac from 'cac';
import { getLogger, } from '../lib/cli-shared-utils/lib/logger';
import { ISchedulerOpts, } from './index';
import getJson from '../lib/util/getJson';

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