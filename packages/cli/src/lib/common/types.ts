import { Logger, } from '../cli-shared-utils/lib/logger';
import FrameworkMonitor from '../cli-shared-utils/lib/monitor/framework-monitor';
import { Watcher, } from '../cli-shared-utils/lib/watcher';

// 全局rc配置
export interface IGlobalRc {
  /** h5pro 执行地址 */
  h5ProExecPath?: string;
  /** 本地ide路径 */
  localDownloadedIdePath?: string;
  /** 本地ide版本 */
  localDownloadedIdeVersion?: string;
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
  /** 通用 */
  type: EAppType;
  typescript?: boolean;
  base?: string;
  outDir?: string;
  miniAppId?: string;
  token?: string;
  version?: string;
  isPcPlugin?: boolean;
  corpId?: string;

  /** 专用于pc工作台插件 */
  pcPreviewOptions?: {
    mode?: 'light' | 'dark';
  };
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
  cwd?: string;
  dtdConfig?: IWorkspaceRc; // dtd.config.json
  miniProgramConfigContent?: IMiniProjectJson; // mini.project.json
  miniProgramConfigPath?: string;
  hasOriginDtdConfig?: boolean;
  logger?: Logger;
  watcher?: Watcher;
  yuyanId?: string;
  
  setDtdConfig?: (config: IWorkspaceRc) => void;
  setLogger?: (logger: Logger) => void;
  setCommandName?: (name: string) => void;
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
  options?: ICommandOptionConfigMap<CO>,
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
  upload = 'upload',
  dev = 'dev'
}

export enum EDtdCLIKeyDep {
  cli = 'dingtalk-design-cli',
  generator = 'generator-dd-application',
  opensdk = 'dingtalk-miniapp-opensdk',
  validateScript = '@ali/dingtalk-worktab-plugin-script'
}

export interface IDtdCLIDep {
  name: EDtdCLIKeyDep;
  version?: string;
}

export enum ECompileType {
  MiniProgram = 'mini',
  Plugin = 'plugin',
}

export interface IMiniScripts {
  watch?: string;
  beforeCompile?: string;
  beforePreview?: string;
  beforeUpload?: string;
}

export interface IMiniProjectJson {
  miniprogramRoot?: string;
  pluginRoot?: string;
  compileType?: ECompileType;
  scripts?: IMiniScripts;
  include?: string[];
  exclude?: string[];
  uniBuild?: boolean;
  cloud?: string;
  component2?: boolean;
  axmlStrictCheck?: boolean;
  nonLoadingIndicator?: boolean;
  enableParallelLoader?: boolean;
  enableDistFileMinify?: boolean;
  enableNodeModuleBabelTransform?: boolean;
  enableAppxNg?: boolean | 'YES';
  enableCube?: boolean | 'YES' | 'SHARED' | 'NO';
  enableEnhancedBuild?: boolean;
  enableUnibuildAndAppxngComplexBundle?: boolean;
  // debugOptions?: IMiniDebugOptions;
  enableHMR?: boolean;
}