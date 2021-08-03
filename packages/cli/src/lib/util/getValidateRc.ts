import {
  getRuleCheckInfos,
  getPermissionPoint,
  RuleCheckInfos,
  PermissionPoint,
} from '../sevice/index';
import { IRcJson, } from 'dingtalk-worktab-plugin-script/dist/src/types/index';
import { logger, } from '../cli-shared-utils/lib/logger';
import getMonitor from '../cli-shared-utils/lib/monitor/framework-monitor';
import config from '../common/config';

const monitor = getMonitor(config.yuyanId);

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
      // supportEnvironments代表工作台组件支持的运行环境，如["mobile", "pc"]
      // apiList代表工作台组件具有的权限点
      // 这部分逻辑和plugin-valid项目中的处理保持一致
      const supportEnvironment = ['mobile'];
      if (isPcPlugin) supportEnvironment.push('pc');

      const parsedConfig = JSON.parse(pluginRuleCheckDetail);
      const targetConfig = parsedConfig[packCode] || {};
      const reg = new RegExp(`"\\$\{${packCode}_apiList}"`);

      targetConfig.supportEnvironment = supportEnvironment;      
      const rcJson = JSON.stringify(targetConfig).replace(reg, JSON.stringify(permissionPointList));
      
      logger.debug('validate rc', rcJson);
      return JSON.parse(rcJson);
    }).catch(e => {
      logger.debug('getValidateRc fail', e);
      monitor.logJSError(new Error(e));
      return null;
    });
};
