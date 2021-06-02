import {
  getRuleCheckInfos,
  getPermissionPoint,
  RuleCheckInfos,
  PermissionPoint,
} from '../sevice/index';
import { IRcJson, } from '@ali/dingtalk-worktab-plugin-script/dist/src/types/index';

export default (): Promise<IRcJson> => {
  const ruleCheckInfosPromise = new Promise((resolve) => {
    const cb = (data: RuleCheckInfos) => {
      resolve(data);
    };
    getRuleCheckInfos(cb);
  });

  const getPermissionPointPromise = new Promise((resolve) => {
    const cb = (data: PermissionPoint) => {
      resolve(data);
    };
    getPermissionPoint(cb);
  });
  
  return Promise.all([ruleCheckInfosPromise, getPermissionPointPromise])
    .then((res) => {
      // 三类 ${outerBigCustomerIndustry_apiList} ${innerBigCustomerIndustry_apiList} ${basic_apiList}
      const {
        packCode,
        pluginRuleCheckDetail,
      } = res[0] as RuleCheckInfos;
      const {
        permissionPointList,
      } = res[1] as PermissionPoint;
      const rcJson = pluginRuleCheckDetail.replace(`${packCode}_apiList`, permissionPointList.toString());
      const packRcJson = JSON.parse(rcJson)[packCode];
      return packRcJson;
    });
};
