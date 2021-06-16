import {
  getRuleCheckInfos,
  getPermissionPoint,
  RuleCheckInfos,
  PermissionPoint,
} from '../sevice/index';
import { IRcJson, } from 'dingtalk-worktab-plugin-script/dist/src/types/index';
import { logger, } from '../cli-shared-utils/lib/logger';

export default (miniAppId: string, token: string, isPcPlugin: boolean): Promise<IRcJson> => {
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

      // 拉取到rc后，需要inject supportEnvironments以及apiList
      // supportEnvironments代表插件支持的运行环境，如["mobile", "pc"]
      // apiList代表插件具有的权限点
      // 这部分逻辑和plugin-valid项目中的处理保持一致
      const supportEnvironment = ['mobile'];
      if (isPcPlugin) supportEnvironment.push('pc');

      const rcJson = pluginRuleCheckDetail.replace(`${packCode}_apiList`, permissionPointList.toString());
      const packRcJson = JSON.parse(rcJson)[packCode];
      logger.debug('validate rc', packRcJson);
      packRcJson.supportEnvironment = supportEnvironment;
      return packRcJson;
    }).catch(e => {
      logger.debug('getValidateRc fail', e);
      return null;
    });
};
