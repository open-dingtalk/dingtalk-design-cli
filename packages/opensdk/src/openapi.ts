import AliOSS from 'ali-oss';
import axios, { AxiosInstance, } from 'axios';
import qs from 'qs';
import { BuildStatusEnum, } from './types';

export interface IOpenResult<T> {
  errcode: number;
  errmsg: string;
  result: T;
}

export interface IOpenSDKConfig {
  appKey: string;
  appSecret: string;
  accessToken?: string;
  host?: string;
}

export interface IAccessTokenRequestParams {
  miniapp_id: string;
}

export interface IPreviewBuildStatusResult {
  task_id: string;
  finished: boolean;
  result_url?: string;
  build_id: number;
}

export interface IBuildStatusResult {
  build_id: number;
  task_id: string;
  finished: boolean;
  status: BuildStatusEnum;
  version: string;
  version_created: boolean;
  // finished?: boolean;
  build_info: string;
  log_url: string;
}

export interface IAccessTokenResult {
  name: string;
  accessid: string;
  access_key_secret: string;
  security_token: string;
  expiration: string;
}

export interface IPlugin {
  plugin_id: string; 
  plugin_version: string;
  // FIXME: 预发接口入参印射拼写错了，要修正
  pluign_version?: string;
}

export interface ISubPackage {
  type: string;
  path: string;
  package_key: string;
}

export interface IPreviewBuildParams {
  miniapp_id: string;
  package_key: string;
  enable_tabbar: 'YES' | 'NO',
  main_page: string;
  page?: string;
  query?: string;
  corp_id?: string;
  ignore_http_req_permission?: boolean;
  ignore_webview_domain_check?: boolean;
  plugin_refs?: IPlugin[];
  plugin_type?: 'WIDGET';
  plugin_package_key?: string;
  sub_packages?: ISubPackage[];
  // SDK构建脚本的版本，上报
  build_script_version: string;
  is_remote_x?: boolean;
  channel?: string;
  tyroid?: string;
}

export interface IPreviewBuildResult {
  task_id: string;
}

export interface IBuildParams {
  miniapp_id: string;
  package_key: string;
  package_md5: string;
  enable_tabbar: 'YES' | 'NO';
  main_page: string;
  package_version?: string;
  plugin_refs?: Array<{ plugin_id: string; plugin_version: string; }>;
}

export interface IBuildResult {
  task_id: string;
}

export interface IBuildStatusParams {
  miniapp_id: string;
  task_id: string;
}

export interface IOpenApiAccessTokenResult {
  errcode: number;
  errmsg: string;
  access_token: string;
}

export interface IUploadParams {
  miniAppId: string;
  src: string;
  extname?: string;
}

export class OpenAPI {
  private client: AxiosInstance;
  private accessToken?: string;

  constructor(private options: IOpenSDKConfig) {
    if (!options.host) {
      options.host = 'https://oapi.dingtalk.com';
    }

    if (options.accessToken) {
      this.accessToken = options.accessToken;
    }

    this.client = axios;
  }

  async init() {
    if (!this.accessToken) {
      this.accessToken = await this.getApiToken();
    }
  }

  async getApiToken() {
    const response = await this.client.get<IOpenApiAccessTokenResult>(`${this.options.host}/gettoken?${qs.stringify({
      appkey: this.options.appKey,
      appsecret: this.options.appSecret,
    })}`);

    if (response.status !== 200) {
      console.error('gettoken error', response);
      throw new Error(`[${response.status}]${response.statusText}`);
    }

    const responseData = response.data;

    if (responseData.errcode) {
      throw new Error(`[${responseData.errcode}]${responseData.errmsg}`);
    }

    return responseData.access_token;
  }

  private request<R>(method: 'GET' | 'POST', pathname: string, query = {}, data = {}): Promise<R> {
    const requestUrl = `${this.options.host}/topapi${pathname}`;
    const requestHeaders: Record<string, string> = {};

    if (method === 'POST') {
      requestHeaders['content-type'] = 'application/json';
    }

    return this.client.request<IOpenResult<R>>({
      url: requestUrl,
      headers: requestHeaders,
      params: {
        ...query,
        access_token: this.accessToken,
      },
      method,
      data,
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`[${response.status}]${response.statusText}`);
        }

        const responseData = response.data;

        if (responseData.errcode) {
          throw new Error(`[${responseData.errcode}]${responseData.errmsg}`);
        } else {
          return responseData.result;
        }
      })
      .catch(e => {
        return Promise.reject(e);
      });
  }

  getUploadAccessKey(params: IAccessTokenRequestParams) {
    return this.request<IAccessTokenResult>('GET', '/mpdev/accesskey/get', params);
  }

  createPreviewBuildTask(params: IPreviewBuildParams) {
    return this.request<IPreviewBuildResult>('POST', '/mpdev/previewbuild/create', undefined, params);
  }

  getPreviewBuildStatus(params: IBuildStatusParams) {
    return this.request<IPreviewBuildStatusResult>('GET', '/mpdev/previewbuild/status/get', params);
  }

  createBuildTask(params: IBuildParams) {
    return this.request<IBuildResult>('POST', '/mpdev/build/create', undefined, params);
  }

  getBuildStatus(params: IBuildStatusParams) {
    return this.request<IBuildStatusResult>('GET', '/mpdev/build/status/get', params);
  }

  async upload(params: IUploadParams) {
    const { miniAppId, src, extname, } = params;

    const accessToken = await this.getUploadAccessKey({
      miniapp_id: miniAppId,
    });
    const storeName = extname ? accessToken.name + extname : accessToken.name;

    const store = new AliOSS({
      bucket: 'dingtalk-miniapp-private',
      region: 'oss-cn-shanghai',
      accessKeyId: accessToken.accessid,
      accessKeySecret: accessToken.access_key_secret,
      stsToken: accessToken.security_token,
      timeout: 30 * 60 * 1000,
    });

    await store.put(storeName, src);

    return storeName;
  }
}