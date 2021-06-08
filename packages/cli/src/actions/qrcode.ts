import { sdk as opensdk, } from 'dingtalk-miniapp-opensdk';
import { BuildStatusEnum, BuildStatusText, EBuildTarget, } from 'dingtalk-miniapp-opensdk/dist/types';
import { ICommandContext, IWorkspaceRc, } from '../lib/common/types';
import { logWithSpinner, stopSpinner, failSpinner, successSpinner, } from '../lib/cli-shared-utils/lib/spinner';
import { logger, } from '../lib/cli-shared-utils/lib/logger';

/**
 * 小程序与普通工作台插件 - 本地构建、上传debug包、生成预览二维码
 */
export default async (commandContext: ICommandContext) => {
  const {
    dtdConfig,
    cwd,
  } = commandContext;

  const {
    token,
    miniAppId,
    type,
  } = dtdConfig;

  if (!token || !miniAppId) {
    logger.error('缺少必要参数 miniAppId 或 token，请参考文档 xxx');
    return;
  }

  opensdk.setConfig({
    appKey: '',
    appSecret: '',
    accessToken: token,
    host: process.env.DEBUG ? 'https://pre-oapi.dingtalk.com' : 'https://oapi.dingtalk.com',
  });

  try {
    await opensdk.previewBuild({
      /** 项目路径 */
      project: cwd,
      /** 小程序ID， 必填 */
      miniAppId,
      /** 起始页，选填 */
      // page: "pages/index/index",
      /** App.onLaunch中的参数 */
      // query: "a=2&b=2",
      /** 忽略http请求安全域名校验，仅在调试模拟生效 */
      ignoreHttpReqPermission: true,
      /** 忽略web-view安全域名校验，仅在调试模式生效 */
      ignoreWebViewDomainCheck: true,
      /**  */
      onProgressUpdate(info) {
        logger.debug('拉取构建结果', info);
        
        if (info.status === BuildStatusText[BuildStatusEnum.FAILED]) {
          failSpinner('构建失败');
          logger.error(info.data);
        } else if (info.status === BuildStatusText[BuildStatusEnum.OVERTIME]) {
          failSpinner('构建超时');
          logger.error(info.data);
        } else if (info.status === BuildStatusText[BuildStatusEnum.SUCCESS]) {
          successSpinner('构建成功');
        }
      },
      buildTarget: EBuildTarget.Preview,
    });
  } catch(e) {
    failSpinner('生成构建任务出错');
    logger.error(e.message);
  }
};