
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