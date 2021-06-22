import { sdk as opensdk, } from 'dingtalk-miniapp-opensdk';
import { BuildStatusEnum, BuildStatusText, EBuildTarget, } from 'dingtalk-miniapp-opensdk/dist/types';
import { EApiName, EStdioCommands, ICommandContext, } from '../lib/common/types';
import { failSpinner, successSpinner, } from '../lib/cli-shared-utils/lib/spinner';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';

const monitor = getMonitor(config.yuyanId);

/**
 * 小程序与普通工作台组件 - 本地构建、上传debug包、生成预览二维码
 */
export default async (commandContext: ICommandContext) => {
  const {
    dtdConfig,
    cwd,
  } = commandContext;

  const {
    token,
    miniAppId,
  } = dtdConfig;

  if (!token || !miniAppId) {
    logger.error('缺少必要参数 miniAppId 或 token');
    commandContext.logTips(dtdConfig.type, EStdioCommands.QRCODE);
    return;
  }

  opensdk.setConfig({
    appKey: '',
    appSecret: '',
    accessToken: token,
    host: 'https://oapi.dingtalk.com',
  });

  monitor.logApiInvoke(EApiName.PREVIEW);

  const previewPlainParams = {
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
    buildTarget: EBuildTarget.Preview,
  };
  try {
    await opensdk.previewBuild({
      ...previewPlainParams,
      onProgressUpdate(info) {
        logger.debug('拉取构建结果', info);
        monitor.logApiInvoke(EApiName.GET_PREVIEW_STATUS);
        
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
    });
  } catch(e) {
    failSpinner('生成构建任务出错');
    logger.error(e.message);
    
    // TODO: preview实现在opensdk内部，无法统计具体是接口失败还是jserror，先归为接口问题
    monitor.logApiError(
      EApiName.PREVIEW,
      e.message,
      previewPlainParams,
    );
  }
};