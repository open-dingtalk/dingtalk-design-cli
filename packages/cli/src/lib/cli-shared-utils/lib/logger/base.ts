/**
 * Module dependencies
 */
import chalk from 'chalk';
import { ILoggerElement, ELoggerLevel, ILoggerOptions, } from './types'; 

/**
  * Expose LoggerBase
  */
export class LoggerBase {
   prefix: string;
 
   options: ILoggerOptions;
 
   getLogArgsWithPrefix: (args: ILoggerElement[]) => ILoggerElement[];
 
   constructor(
     prefix?: string,
     options: ILoggerOptions = {} as ILoggerOptions,
   ) {
     this.options = {
       logLevel: options.debug || process.argv.includes('--verbose')
         ? ELoggerLevel.debug
         : ELoggerLevel.info,
       ...options,
     };
     this.prefix = prefix || '';
     const prefixLog = chalk.dim(`[${this.prefix}]`);
     this.getLogArgsWithPrefix = this.prefix
       ? ((args: ILoggerElement[]): ILoggerElement[] => [prefixLog, ...args])
       : ((args: ILoggerElement[]): ILoggerElement[] => args);
   }
 
   public setOptions(options: ILoggerOptions) {
     Object.assign(this.options, options);
   }
 
   public useLogLevel(logLevel: ELoggerLevel, fn: () => void) {
     if (this.options.logLevel && this.options.logLevel >= logLevel) {
       fn();
     }
   }
}
 