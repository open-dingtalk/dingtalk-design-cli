import axios, { AxiosInstance, } from 'axios';
import url from 'url';
import {
  IOpenH5PackageParams,
  IOpenH5PackageResult,
  ICloseH5PackageParams,
  ICloseH5PackageResult,
  IGetH5packageUploadtokenParams,
  IGetH5packageUploadtokenResult,
  ICreateH5packageParams,
  ICreateH5packageResult,
  IGetCreateH5packageStatusParams,
  IGetCreateH5packageStatusResult,
  IPublishH5packageParams,
  IPublishH5packageResult,
  IRollbackH5packageParams,
  IRollbackH5packageResult,
} from './types';

export interface IOpenV2ErrorResult {
  RequestId: string;
  HostId: string;
  Code: string;
  Message: string;
  Recommend: string;
}

export type IOpenV2SuccessResult<T> = T;

export interface IOpenSDKConfig {
  accessToken: string;
  host?: string;
}

/**
 * new OpenAPIV2({
 *   host: '',
 *   accessToken: '',
 * });
 */
export class OpenAPIV2 {
  private client: AxiosInstance;
  private accessToken?: string;

  constructor(private options: IOpenSDKConfig) {
    if (!options.host) {
      options.host = 'https://api.dingtalk.com';
    }

    if (options.accessToken) {
      this.accessToken = options.accessToken;
    }

    this.client = axios;
  }

  private request<R>(method: 'GET' | 'POST', pathname: string, query = {}, data = {}): Promise<R> {
    const requestUrl = new URL(pathname, this.options.host);
    
    const requestHeaders: Record<string, string> = {};

    if (method === 'POST') {
      requestHeaders['content-type'] = 'application/json';
    }
    requestHeaders['x-acs-dingtalk-access-token'] = this.accessToken;

    return this.client.request<IOpenV2SuccessResult<R> & IOpenV2ErrorResult>({
      url: requestUrl.href,
      headers: requestHeaders,
      params: query,
      method,
      data,
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`[${response.status}]${response.statusText}`);
        }
        const responseData = response.data;
        if (responseData.Code) {
          throw new Error(`[${responseData.Code}]${responseData.Message}`);
        } else {
          return responseData;
        }
      })
      .catch(e => {
        return Promise.reject(e);
      });
  }

  
  /**
   * 开启h5微应用离线包
   * @param params 
   * @returns 
   */
  openH5package(params: IOpenH5PackageParams): Promise<IOpenH5PackageResult> {
    return this.request<IOpenH5PackageResult>('POST', '/v1.0/h5package/open', {}, params);
  }

  /**
   * 关闭h5微应用离线包
   * @param params 
   * @returns 
   */
  closeH5package(params: ICloseH5PackageParams): Promise<ICloseH5PackageResult> {
    return this.request<ICloseH5PackageResult>('POST', '/v1.0/h5package/close', {}, params);
  }

  /**
   * 获取H5应用离线包上传的sso token，获取上传token后，通过ali-oss上传文件。
   * @param params 
   * @returns 
   */
  getH5packageUploadtoken(params: IGetH5packageUploadtokenParams): Promise<IGetH5packageUploadtokenResult> {
    return this.request<IGetH5packageUploadtokenResult>('GET', '/v1.0/h5package/uploadTokens', params);
  }
  
  /**
   * 异步创建H5离线包生成任务
   * @param params 
   * @returns 
   */
  createH5package(params: ICreateH5packageParams): Promise<ICreateH5packageResult> {
    return this.request<ICreateH5packageResult>('POST', '/v1.0/h5package', {}, params);
  }

  /**
   * 获取H5离线包创建任务的完成状态
   * @param params 
   * @returns 
   */
  getCreateH5packageStatus(params: IGetCreateH5packageStatusParams): Promise<IGetCreateH5packageStatusResult> {
    return this.request<IGetCreateH5packageStatusResult>('GET', '/v1.0/h5package/createStatus', params);
  }

  /**
   * 上线离线包
   * @param params 
   * @returns 
   */
  publishH5package(params: IPublishH5packageParams): Promise<IPublishH5packageResult> {
    return this.request<IPublishH5packageResult>('POST', '/v1.0/h5package/publish', {}, params);
  }

  /**
   * 离线包回退到上一个线上版本
   * @param params 
   * @returns 
   */
  rollbackH5package(params: IRollbackH5packageParams): Promise<IRollbackH5packageResult> {
    return this.request<IRollbackH5packageResult>('POST', '/v1.0/h5package/rollback', {}, params);
  }
}