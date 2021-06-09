/**
 * Module dependencies
 */
import chalk, { Color, Modifiers, } from 'chalk';
import { LoggerBase, } from './base';
import { ELoggerLevel, ILoggerElement, } from './types';

/**
  * Expose Logger
  */
export class Logger extends LoggerBase {
  // level: 1
  error(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.error, () => {
      process.exitCode = process.exitCode || 1;
      console.error(chalk.red('error'), ...args);
    });
  }
 
  // level: 2
  warn(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.warn, () => {
      console.warn(chalk.yellow('warning'), ...args);
    });
  }
 
  // level: 3
  success(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.info, () => {
      this.status('green', 'success', ...args);
    });
  }
 
  // level: 3
  tip(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.info, () => {
      this.status('blue', 'tip', ...args);
    });
  }
 
  // level: 3
  info(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.info, () => {
      this.status('gray', '', ...args);
    });
  }
 
  // level: 3
  log(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.info, () => {
      this.status('gray', '', ...args);
    });
  }
 
  status(
    color: typeof Color | typeof Modifiers,
    label: string, ...args: ILoggerElement[]
  ) {
    if (this.options.logLevel && this.options.logLevel >= ELoggerLevel.debug) {
      this._statuslog(color, label, ...(this.getLogArgsWithPrefix(args)));
    } else {
      this._statuslog(color, label, ...args);
    }
  }
 
  _statuslog(
    color: typeof Color | typeof Modifiers,
    label: string, ...args: ILoggerElement[]
  ) {
    if (label) {
      console.log(chalk[color](label), ...args);
    } else {
      console.log(...args);
    }
  }
 
  // level: 4
  public debug(...args: ILoggerElement[]) {
    this.useLogLevel(ELoggerLevel.debug, () => {
      this.status('magenta', 'debug', ...args);
    });
  }
}

const cachedLogger = new Map<string, any>();

export const getLogger = (prefix: string) => {
  const cached = cachedLogger.get(prefix);
  if (cached) {
    return cached;
  }
  const _logger = new Logger(prefix);
  cachedLogger.set(prefix, _logger);
  return _logger;
};

export const logger = new Logger();