import assert from 'assert';
import { findAppConfig, } from './config/appConfig';
import { findProjectConfig, } from './config/projectConfig';
import { IOpenSDKConfig, } from './openapi';
import { BuildTask, IBuildTaskParams, } from './task/BuildTask';
import { IPreviewBuildOptions, PreviewBuildTask, } from './task/PreviewBuildTasK';
import { parsePath, } from './utils';

class MiniAppOpenSDK {
  private sdkConfig?: IOpenSDKConfig;

  setConfig(sdkConfig: IOpenSDKConfig) {
    this.sdkConfig = sdkConfig;
  }
 
  previewBuild(options: IPreviewBuildOptions) {
    if (!this.sdkConfig) {
      throw new Error('sdk must be config');
    }

    assert(options.project, 'project must be config');
    assert(options.miniAppId, 'miniAppId must be config');

    const project = parsePath(options.project);
    const projectConfig = findProjectConfig(project);
    const appConfig = findAppConfig(project, projectConfig);

    const task = new PreviewBuildTask({
      projectConfig,
      appConfig,
      sdkConfig: this.sdkConfig,
      options: {
        ...options,
        project,
      },
    });

    return task.start();
  }

  miniUpload(options: IBuildTaskParams) {
    if (!this.sdkConfig) {
      throw new Error('sdk must be config');
    }

    assert(options.project, 'project must be config');
    assert(options.miniAppId, 'miniAppId must be config');

    const project = parsePath(options.project);
    const projectConfig = findProjectConfig(project);
    const appConfig = findAppConfig(project, projectConfig);

    const task = new BuildTask({
      sdkConfig: this.sdkConfig,
      projectConfig,
      appConfig,
      options: {
        ...options,
        project,
      },
    });

    return task.start();
  }
}

export const sdk = new MiniAppOpenSDK();