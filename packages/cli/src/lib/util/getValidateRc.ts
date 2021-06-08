import {
  getRuleCheckInfos,
  getPermissionPoint,
  RuleCheckInfos,
  PermissionPoint,
} from '../sevice/index';
import { IRcJson, } from '@ali/dingtalk-worktab-plugin-script/dist/src/types/index';
import { logger, } from '../cli-shared-utils/lib/logger';

export default (miniAppId: string, token: string): Promise<IRcJson> => {
  const ruleCheckInfosPromise = getRuleCheckInfos(miniAppId, token);
  const getPermissionPointPromise = getPermissionPoint(miniAppId, token);
  
  return Promise.all([ruleCheckInfosPromise, getPermissionPointPromise])
    .then((res) => {
      const {
        packCode,
        pluginRuleCheckDetail,
      } = res[0].data as RuleCheckInfos;
      const {
        permissionPointList,
      } = res[1].data as PermissionPoint;
      const rcJson = pluginRuleCheckDetail.replace(`${packCode}_apiList`, permissionPointList.toString());
      const packRcJson = JSON.parse(rcJson)[packCode];
      logger.debug('validate rc', packRcJson);
      return packRcJson;
    }).catch(e => {
      logger.debug('getValidateRc fail', e);
      return null;
    });
};
