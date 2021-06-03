import urllib from 'urllib';
import path from 'path';
import getRc from '../util/getRc';
import { IWorkspaceRc, } from '../common/types';

const cwd = path.resolve('./');
const rcPath = path.join(cwd, '.ddrc');
const rcContent: IWorkspaceRc = getRc(rcPath);
const miniAppId = rcContent && rcContent.miniAppId;
const apiToken = rcContent && rcContent.apiToken;

function request(url, headers, cb) {
  const opt = {
    headers,
  };
  const callback = (err, jsonData, res) => {
    if (err) {
      throw err;
    }
    const data = JSON.parse(jsonData.toString());
    cb(data);
  };
  urllib.request(url, opt, callback);
}

export interface RuleCheckInfos {
  packCode: string;
  pluginRuleCheckDetail: string;
}

export interface PermissionPoint {
  permissionPointList: string[],
}

export function getRuleCheckInfos(cb: (RuleCheckInfos) => void): void {
  request(`https://pre-api.dingtalk.com/v1.0/workbench/plugins/ruleCheckInfos?miniAppId=${miniAppId}`, {
    'x-acs-dingtalk-access-token': apiToken,
  }, cb);
}

export function getPermissionPoint(cb: (PermissionPoint) => void): void {
  request(`https://pre-api.dingtalk.com/v1.0/workbench/plugins/permissionpoint?miniAppId=${miniAppId}`, {
    'x-acs-dingtalk-access-token': apiToken,
  }, cb);
}
