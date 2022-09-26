import archiver from 'archiver';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { v4 as uuid, } from 'uuid';
import AliOSS from 'ali-oss';

import { IGatewayOptions, OpenGateWay, } from './OpenGateway';

export interface ISdkOptions extends IGatewayOptions {}

export interface IUploadOptions {
  appId: string;
  agentId: string;
  input: string;
}

export interface IPublishOptions {
  appId: string;
  agentId: string;
  version: string;
}

export function packTarGz(dir: string, dist: string) {
  return new Promise<{
    size: number;
    output: string;
  }>((resolve, reject) => {
    fs.ensureDirSync(path.dirname(dist));

    const output = fs.createWriteStream(dist);
    const archive = archiver('tar', { gzip: true, });
    let size = 0;

    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes');
      size = archive.pointer();
      resolve({ size, output: dist, });
    });
    output.on('end', () => {
      console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.glob('**', { cwd: dir, });
    archive.finalize();
  });
}

const enum OpenApiAction {
  GetUploadToken = '/v1.0/h5package/uploadTokens',
  UploadPackage = '/v1.0/h5package/asyncUpload',
  GetUploadStatus = '/v1.0/h5package/uploadStatus',
  Publish = 'v1.0/h5package/publish',
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

class MiniAppOpenSDK {
  private sdkConfig?: ISdkOptions;
  private gateway!: OpenGateWay;

  setConfig(sdkConfig: ISdkOptions) {
    this.sdkConfig = sdkConfig;
    this.gateway = new OpenGateWay(sdkConfig);
  }

  private async pollingCreateStatusWhenFinished(
    taskId: string,
    beginTime: number,
    maxTimeoutLimit: number
  ): Promise<IGetCreateStatusResult> {
    const createStatus = await this.gateway.request<IGetCreateStatusResult>(
      'GET',
      OpenApiAction.GetUploadStatus,
      {
        taskId,
      }
    );

    switch (createStatus.status) {
    case CreateStatus.Packing: {
      const now = Date.now();
      const costTime = now - beginTime;

      if (costTime > maxTimeoutLimit) {
        throw new Error('create package timeout');
      }

      console.log('create task is doing, query task status 10s later');
      return new Promise<IGetCreateStatusResult>((r, c) => {
        setTimeout(() => {
          this.pollingCreateStatusWhenFinished(
            taskId,
            beginTime,
            maxTimeoutLimit
          ).then(r, c);
        }, 10 * 1000);
      });
    }
    case CreateStatus.Success: {
      console.log('create task is finished');
      console.log(createStatus);
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
    const { input, ...commonParamenters } = options;
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

    const packResult = await packTarGz(
      input,
      path.join(os.tmpdir(), `${uuid()}.tar.gz`)
    );
    await ossClient.put(name, packResult.output);
    const createResult = await this.gateway.request<ICreatePackageResult>(
      'POST',
      OpenApiAction.UploadPackage,
      {},
      {
        ...commonParamenters,
        ossObjectKey: name,
      }
    );

    const packageInfo = await this.pollingCreateStatusWhenFinished(
      createResult.taskId,
      Date.now(),
      maxTimeoutLimit
    );

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
