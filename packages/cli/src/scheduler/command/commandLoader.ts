import { ICommandConfig, PlainRecord, } from '../../lib/common/types';
import { logger, } from '../../lib/cli-shared-utils/lib/logger';
import { isAbsolute, } from 'path';
import { existsSync, } from 'fs';
import * as path from 'path';

/**
 * Expose a utility to resolve path of a command.
 * @param name command name
 */
export function resolveCommandPath(
  name: string,
  root: string,
): string {
  if (isAbsolute(name)) {
    if (!existsSync(name)) {
      throw new Error(`command: ${name} does not exist!`);
    }
  }
  const modulePath = require.resolve(path.resolve(root, name));
  return modulePath;
}

/**
 * Expose a utility to resolve a command.
 * @param name command name
 */
export function resolveCommand<CO = PlainRecord>(
  name: string,
  root: string,
): ICommandConfig<CO> {
  try {
    const modulePath = resolveCommandPath(
      name,
      root,
    );
    const required = require(modulePath);
    return required.default || required;
  } catch (e) {
    if (e instanceof Error) {
      logger.error(`Failed to load command: ${name}\n${e.message}`);
    } else {
      logger.error(`Failed to load command: ${name}\n${JSON.stringify(e)}`);
    }
    throw e;
  }
}