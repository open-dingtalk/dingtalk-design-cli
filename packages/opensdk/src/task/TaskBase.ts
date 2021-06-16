import { IOpenSDKConfig, OpenAPI, } from '../openapi';
import path from 'path';
import os from 'os';
import { IProjectConfig, } from '../config/projectConfig';
import { IAppConfig, } from '../config/appConfig';
import { getCompiler, MiniProgramCompiler, } from '../utils/getCompiler';
import { EBuildStatusText, } from '../types';

export interface ITaskContext<T> {
  projectConfig: IProjectConfig;
  appConfig: IAppConfig;
  sdkConfig: IOpenSDKConfig;
  options: T;
}

export interface ITaskProgressMessage<T> {
  status: EBuildStatusText;
  data: T;
}

export interface ITaskOptionBase {
  project: string;
  miniAppId: string;
  onProgressUpdate: <T>(message: ITaskProgressMessage<T>) => void;
}

export class TaskBase<T extends ITaskOptionBase> { 
  protected projectDir: string;
  protected outputDir: string;
  protected openApi: OpenAPI;
  protected getCompiler: typeof getCompiler;
  readonly PREVIEW_PACKAGE_SIZE_LIMIT = 50 * 1024 * 1024;
  readonly BUILD_PACKAGE_SIZE_LIMIT = 20 * 1024 * 1024;
  readonly SUBPACKAGE_SINGLE_SIZE_LIMIT = 2 * 1024 * 1024; 
  readonly SUBPACKAGE_WHOLE_SIZE_LIMIT = 10 * 1024 * 1024;

  constructor(readonly context: ITaskContext<T>) {
    const { options, sdkConfig, } = context;

    this.projectDir = path.isAbsolute(options.project) ? options.project : path.join(process.cwd(), options.project);
    this.outputDir = path.join(os.tmpdir(), options.miniAppId, 'build');
    this.openApi = new OpenAPI(sdkConfig);
    this.getCompiler = getCompiler;
  }

  print<T>(message: ITaskProgressMessage<T>) {
    if (this.context.options.onProgressUpdate) {
      this.context.options.onProgressUpdate(message);
    }
  }
}