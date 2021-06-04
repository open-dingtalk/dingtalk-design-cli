export enum ELoggerLevel {
  silent = 0,
  error = 1,
  warn = 2,
  info = 3,
  debug = 4,
}
 
export type ILoggerElement = any;

export interface ILoggerOptions {
  logLevel?: ELoggerLevel;
  debug?: boolean;
}