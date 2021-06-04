import { Logger, } from '../cli-shared-utils/lib/logger';
import FrameworkMonitor from '../cli-shared-utils/lib/monitor/framework-monitor';

// 全局rc配置
export interface IGlobalRc {
  /** h5pro 执行地址 */
  h5ProExecPath: string;
}

// plugin rc 配置
export interface IPluginRc {
  previewOptions: {
    corpId: string;
    mode: string;
  }
}

// pc工作台组件调试参数
export interface IPcPluginDevOpts {
  corpId: string;
  mode: string;
}

export enum EAppType {
  PLUGIN = 'plugin',
  MP = 'mp',
  H5 = 'h5'
}

// 项目rc配置
export interface IWorkspaceRc {
  type: EAppType;
  miniAppId?: string;
  apiToken?: string;
  version?: string;
}

export type PlainRecord<T = any> = Record<string, T>;

export type MinifishCommandAction<CO, CTX, S = unknown> = (options: CO, ctx: CTX) => S;

/**
 * Interface of command option.
 */
export interface ICommandOptionConfig {
  /**
   * Description of option.
   */
  description?: string;
  /**
   * Type of option, defaults to boolean.
   */
  type?: 'string' | 'boolean';
  /**
   * Default value of option.
   */
  default?: any;
  /**
   * Require value or not when its type is string, defaults to true.
   */
  requiredValue?: boolean;
  /**
   * shortcut for this option.
   */
  shortcut?: string;
}

export type ICommandContext<CO = PlainRecord> = {
  commandName?: string;
  commandArgs: readonly string[];
  commandOptions: CO;
  monitor: FrameworkMonitor;
  cwd: string;
  logger?: Logger;
}

export enum ECommandConfigProperty {
  name = 'name',
  registerCommand = 'registerCommand',
} 

export type ICommandConfigName = string;

/**
 * Interface of command option object.
 */
export type ICommandOptionConfigMap<T> = {
  [key in keyof T]?: ICommandOptionConfig
};

export interface ICommandConfigOpts<CO = PlainRecord> {
  command: {
    name: string;
    description: string;
  },
  options: ICommandOptionConfigMap<CO>,
  action: (options: CO, ctx: ICommandContext<CO>) => Promise<void>
}

export interface ICommandConfig<
  CO /* Command Options */ = PlainRecord,
> {
  [ECommandConfigProperty.name]: ICommandConfigName;
  [ECommandConfigProperty.registerCommand]: (ctx: ICommandContext<CO>) => ICommandConfigOpts<CO>;
}

export enum ECommandName {
  init = 'init',
  lint = 'lint',
  preview = 'preview',
  upload = 'upload'
}