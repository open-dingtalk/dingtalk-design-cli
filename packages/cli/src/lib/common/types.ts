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
  type: EAppType | '';
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
  commandName?: ECommandName | '';
  commandArgs: readonly string[];
  commandOptions: CO;
  cwd: string;
  dtdConfig: IWorkspaceRc; // ding.config.json
  miniProgramConfigContent: IMiniProjectJson; // mini.project.json
  miniProgramConfigPath: string;
  hasOriginDtdConfig: boolean;
  logger: Logger;
  watcher: Watcher;
  yuyanId: string;
  
  setDtdConfig: (config: IWorkspaceRc) => void;
  setLogger: (logger: Logger) => void;
  setCommandName: (name: ECommandName) => void;
  logTips: (appType: IWorkspaceRc['type'], commandName: EStdioCommands) => void;
}

export enum ECommandConfigProperty {
  name = 'name',
  registerCommand = 'registerCommand',
}

export type ICommandConfigName = ECommandName;

/**
 * Interface of command option object.
 */
export type ICommandOptionConfigMap<T> = {
  [key in keyof T]?: ICommandOptionConfig
};

/**
 * 全局命令选项
 */
export interface IGlobalOptions {
  cwd?: string;
  verbose?: boolean;
}

export interface ICommandConfigOpts<CO = PlainRecord> {
  command: {
    name: ECommandName;
    description: string;
  },
  options?: ICommandOptionConfigMap<CO>,
  action: (options: CO & IGlobalOptions, ctx: ICommandContext<CO>) => Promise<void>
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
  validateScript = 'dingtalk-worktab-plugin-script'
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

/**
 * cli使用到的接口名枚举
 */
export enum EApiName {
  PREVIEW = 'preview', // 预览
  GET_PREVIEW_STATUS = 'getPreviewStatus', // 获取预览状态
  UPLOAD = 'upload', // 构建上传
  GET_UPLOAD_STATUS = 'getUploadStatus', // 获取上传状态
  GET_POINT = 'getPoint', // 拉取插件权限点
  GET_RC = 'getRc' // 拉取插件权限包和rc
}

export enum EStdioCommands {
  IDE = 'ide', // 打开ide lite版
  QRCODE = 'qrcode', // 生成预览二维码
  PC = 'pc', // 在pc端钉钉预览工作台插件
  UPDATE_CONFIG = 'updateConfig', // 更新ding.config.json里的字段
  UPLOAD = 'upload', // 上传小程序或工作台插件
}