import axios, { AxiosInstance, } from 'axios';
import assert from 'assert';

export interface IGatewayOptions {
  host?: string;
  accessToken: string;
}

export type IGatewaySuccessResult<T> = T;

export interface IGatewayErrorResult {
  RequestId: string;
  HostId: string;
  Code: string;
  Message: string;
  Recommend: string;
}

export class OpenGateWay {
  private client: AxiosInstance;
  private accessToken?: string;

  constructor(private options: IGatewayOptions) {
    if (!options.host) {
      options.host = 'https://api.dingtalk.com';
    }

    assert(options.accessToken, 'accessToken is required');

    this.client = axios.create({
      baseURL: options.host,
      timeout: 10000,
      responseType: 'json',
      headers: {
        'x-acs-dingtalk-access-token': options.accessToken,
      },
    });
  }

  public request<R>(
    method: 'GET' | 'POST',
    pathname: string,
    query = {},
    data = {}
  ): Promise<R> {
    return this.client
      .request<IGatewaySuccessResult<R> | IGatewayErrorResult>({
        method,
        url: pathname,
        params: query,
        data,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`[${response.status}]${response.statusText}`);
        }
        const responseData = response.data;
        if ((responseData as IGatewayErrorResult).Code) {
          throw new Error(
            `[${(responseData as IGatewayErrorResult).Code}]${
              (responseData as IGatewayErrorResult).Message
            }`
          );
        } else {
          return responseData as R;
        }
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  }
}
