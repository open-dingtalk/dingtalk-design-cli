import AliOSS from 'ali-oss';

import { IGatewayOptions, OpenGateWay } from './OpenGateway';

export interface ISdkOptions extends IGatewayOptions {}

export interface IUploadOptions {
  miniAppId: string;
  file: string;
}

export interface IPublishOptions {
  miniAppId: string;
  version: string;
}

const enum OpenApiAction {
  GetUploadToken = '/v1.0/package/uploadTokens',
  UploadPackage = '/v1.0/package/h5/asyncUpload',
  GetUploadStatus = '/v1.0/package/h5/uploadStatus',
  Publish = 'v1.0/package/h5/publish',
}

export interface IGetUploadTokenResult {
  accessKeyId: string;
  accessKeySecret: string;
  stsToken: string;
  bucket: string;
  region: string;
  endpoint: string;
  name: string;
}

export interface ICreatePackageResult {
  taskId: string;
}

export const enum CreateStatus {
  Packing = '0',
  Success = '1',
  Failed = '2',
  Timeout = '5',
}

export interface IGetCreateStatusResult {
  status: string;
  taskId: string;
  version: string;
  finished: boolean;
}

export class MiniAppOpenSDK {
  private sdkConfig?: ISdkOptions;
  private gateway!: OpenGateWay;

  setConfig(sdkConfig: ISdkOptions) {
    this.sdkConfig = sdkConfig;
    this.gateway = new OpenGateWay(sdkConfig);
  }

  private async pollingCreateStatusWhenFinished(opts: {
    miniAppId: string;
    taskId: string;
    beginTime: number;
    maxTimeoutLimit: number;
  }): Promise<IGetCreateStatusResult> {
    const createStatus = await this.gateway.request<IGetCreateStatusResult>(
      'GET',
      OpenApiAction.GetUploadStatus,
      {
        miniAppId: opts.miniAppId,
        taskId: opts.taskId,
      }
    );

    switch (createStatus.status) {

    case CreateStatus.Packing: {
      const now = Date.now();
      const costTime = now - opts.beginTime;

      if (costTime > opts.maxTimeoutLimit) {
        throw new Error('create package timeout');
      }

      // eslint-disable-next-line no-console
      console.log('uploading, query task status 10s later');
      return new Promise<IGetCreateStatusResult>((r, c) => {
        setTimeout(() => {
          this.pollingCreateStatusWhenFinished({ ...opts, }).then(r, c);
        }, 10 * 1000);
      });
    }
    case CreateStatus.Success: {
      // eslint-disable-next-line no-console
      console.log('create task is finished', createStatus);
      return createStatus;
    }
    case CreateStatus.Failed: {
      throw new Error('create package failed');
    }
    case CreateStatus.Timeout: {
      throw new Error('create package timeout, please try again');
    }
    default: {
      throw new Error(`unknown create status: ${createStatus.status}`);
    }

    }
  }

  public async createPackage(options: IUploadOptions) {
    const maxTimeoutLimit = 1000 * 60 * 5; // 5 minutes
    const { file, ...commonParamenters } = options;
    const { name, ...ossConfig } =
      await this.gateway.request<IGetUploadTokenResult>(
        'GET',
        OpenApiAction.GetUploadToken,
        commonParamenters
      );
    const ossClient = new AliOSS({
      ...ossConfig,
      secure: true,
    });

    await ossClient.put(name, file);
    const createResult = await this.gateway.request<ICreatePackageResult>(
      'POST',
      OpenApiAction.UploadPackage,
      {},
      {
        ...commonParamenters,
        ossObjectKey: name,
      }
    );

    const packageInfo = await this.pollingCreateStatusWhenFinished({
      ...commonParamenters,
      taskId: createResult.taskId,
      beginTime: Date.now(),
      maxTimeoutLimit,
    });

    return packageInfo;
  }

  public async publishPackage(options: IPublishOptions) {
    return this.gateway.request<void>(
      'POST',
      OpenApiAction.Publish,
      {},
      options
    );
  }
}

export const sdk = new MiniAppOpenSDK();
