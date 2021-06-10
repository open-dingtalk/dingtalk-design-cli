import urllib, { RequestOptions, } from 'urllib';
import path from 'path';
import getRc from '../util/getRc';
import { IWorkspaceRc, } from '../common/types';
import { logger, } from '../cli-shared-utils/lib/logger';
import getMonitor from '../cli-shared-utils/lib/monitor/framework-monitor';
import config from '../common/config';

enum EResponseCode {
  SUCCESS = 0,
  INTERNAL_ERROR = -1,
  REQUEST_ERROR = -2,
}

interface IUnifiedResponse<T> {
  code: EResponseCode;
  data: T;
  msg?: string;
}

const HOST = 'https://pre-api.dingtalk.com';
const monitor = getMonitor(config.yuyanId);

async function request<T>(url: string, opts: RequestOptions): Promise<IUnifiedResponse<T>> {
  try {
    monitor.logApiInvoke(url as any);
    const res = await urllib.request(url, opts);
    const data = JSON.parse(res.data.toString());
    logger.debug('request', url, 'response', data);

    // 发生错误时，会返回阿里云oapi的特定格式...
    if (data.Code && data.RequestId) {
      monitor.logApiError(url as any, data.Message, opts.data, data);
      return {
        code: EResponseCode.REQUEST_ERROR,
        data: null,
        msg: data.Message,
      };
    }

    return {
      code: EResponseCode.SUCCESS,
      data,
    };
  } catch(e) {
    logger.debug(`request url ${url} fail.`, e);
    monitor.logApiError(url as any, e.message, opts.data, e.stack);
    throw {
      code: EResponseCode.INTERNAL_ERROR,
      data: null,
      msg: e.message,
    };
  }
}

export interface RuleCheckInfos {
  packCode: string;
  pluginRuleCheckDetail: string;
}

export interface PermissionPoint {
  permissionPointList: string[],
}

export async function getRuleCheckInfos(miniAppId: string, token: string): Promise<IUnifiedResponse<RuleCheckInfos>> {
  return request(`${HOST}/v1.0/workbench/plugins/ruleCheckInfos?miniAppId=${miniAppId}`, {
    headers: {
      'x-acs-dingtalk-access-token': token,
    },
  });
}

export function getPermissionPoint(miniAppId: string, token: string): Promise<IUnifiedResponse<PermissionPoint>> {
  return request(`${HOST}/v1.0/workbench/plugins/permissionpoint?miniAppId=${miniAppId}`, {
    headers: {
      'x-acs-dingtalk-access-token': token,
    },
  });
}
