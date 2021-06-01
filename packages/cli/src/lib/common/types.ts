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