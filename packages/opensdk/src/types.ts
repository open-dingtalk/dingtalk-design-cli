
export enum BuildStatusEnum {
  IN_QUEUE = '0',
  BUILDING = '1',
  SUCCESS = '2',
  FAILED = '3',
  OVERTIME = '5'
}

export enum EBuildStatusText {
  pending = 'pending',
  building = 'building',
  success = 'success',
  failed = 'failed',
  overtime = 'overtime',
}

export const BuildStatusText = {
  [BuildStatusEnum.IN_QUEUE]: EBuildStatusText.pending,
  [BuildStatusEnum.BUILDING]: EBuildStatusText.building,
  [BuildStatusEnum.SUCCESS]: EBuildStatusText.success,
  [BuildStatusEnum.FAILED]: EBuildStatusText.failed,
  [BuildStatusEnum.OVERTIME]: EBuildStatusText.overtime,
};

export enum ApplicationTypeEnum {
  TINYAPP_NORMAL = 'TINYAPP_NORMAL',
  TINYAPP_PLUGIN = 'TINYAPP_PLUGIN'
}

export interface IBuildInfo {
  taskId: string;
}

export enum ECompileType {
  MiniProgram = 'mini',
  Plugin = 'plugin'
}

export enum EBuildTarget {
  Preview = 'Preview',
  RemoteLegacy = 'RemoteLegacy',
  RemoteX = 'RemoteX',
  RemoteXLite = 'RemoteXLite',
  RemoteBoatman = 'RemoteBoatman',
  Publish = 'Publish'
}

export interface INormalBuildPackResult {
  compileType: ECompileType.MiniProgram;
  enableSubPack: false;
  tarFilePath: string;
  size: number;
  outPath?: string;
  components?: string[];
  gzipFilePath?: string;
  sourceMapZipFile?: string;
  /**
   * 额外的启动参数
   */
  extraLaunchParams?: Record<string, unknown>;
  webpackStatPath?: string;
}

export interface ISubPackageResult {
  type: 'MAIN' | 'SUB';
  path: string;
  size: number;
  tarFilePath: string;
  gzipFilePath?: string;
  webpackStatPath?: string;
}

export interface IPluginBuildPackResult {
  compileType: ECompileType.Plugin;
  enableSubPack: false;
  client: Omit<INormalBuildPackResult, 'compileType' | 'enableSubPack' | 'extendInfo'>;
  plugin: Omit<INormalBuildPackResult, 'compileType' | 'enableSubPack' | 'extendInfo'>;
  components?: string[];
  /**
   * 额外的启动参数
   */
  extraLaunchParams?: Record<string, unknown>;
}

export interface IOpenH5PackageParams {
  /** 内部微应用agentId */
  agentId: number;
}

export interface IOpenH5PackageResult {}

export interface ICloseH5PackageParams {
  /** 内部微应用agentId */
  agentId: number;
}

export interface ICloseH5PackageResult {}

export interface IGetH5packageUploadtokenParams {
  /** 内部微应用agentId */
  agentId: number;
}

export interface IGetH5packageUploadtokenResult {
  /** ali-oss 初始化参数 */
  accessKeyId: string;
  accessKeySecret: string;
  stsToken: string;
  bucket: string;
  endpoint: string;
  region: string;
  /** 文件的name */
  name: string;
}

export interface ICreateH5packageParams {
  /** 内部微应用agentId */
  agentId: number;
  /** 通过uploadtoken接口获取的ossToken中返回的name值。 */
  ossObjectKey: string;
  /** 项目依赖的外部CDN静态资源文件 */
  externalAssets: string[];
}

export interface ICreateH5packageResult {
  /** 版本创建任务ID */
  taskId: string;
}

export interface IGetCreateH5packageStatusParams {
  /** 创建任务ID */
  taskId: string;
}

export interface IGetCreateH5packageStatusResult {
  /** 创建任务ID */
  taskId: string;
  /**
   * 任务当前的状态。可选值：
      ‒ "1"。构建中
      ‒ "2"。成功
      ‒ "3"。失败
      ‒ "5"。超时
   */
  status: string;
  /** H5离线包版本号 */
  version: string;
  /** 任务是否已结束 */
  finished: boolean;
  /** 创建时间。格式为时间戳 */
  buildTime: number;
}

export interface IPublishH5packageParams {
  /** 内部微应用agentId */
  agentId: number;
  /** 原始静态资源oss地址 */
  version: string;
}

export interface IPublishH5packageResult {}

export interface IRollbackH5packageParams {
  /** 内部微应用agentId */
  agentId: number;
  /** 当前需要回滚的版本号 */
  rollbackVersion: string;
  /** 回滚到此版本 */
  targetVersion: string;
}

export interface IRollbackH5packageResult {}