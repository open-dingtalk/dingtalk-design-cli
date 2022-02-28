/**
   * 目前仅服务于钉钉inside小程序场景
   * 参考：https://yuque.antfin.com/docs/share/f5fdcc3d-e6ec-4f00-b598-0bda87a55aa0?#
   */

import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import commmandsConfig from '../commandsConfig';
import { IPreviewArgs, minidev, } from 'minidev';

export interface ICommandOptions {
  'appId'?: string;
  'autoPush'?: boolean;
  'ignoreHttpDomainCheck'?: boolean;
  'ignoreWebviewDomainCheck'?: boolean;
  'clientType'?: string;
  page?: string;
  'pageQuery'?: string;
  query?: string;
  scene?: string;
  'bundleId'?: string;
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.previewInside,
  registerCommand(ctx) {
    return {
      ...commmandsConfig['preview-inside'],
      action: async (options) => {
        const previewParams: IPreviewArgs = {
          appId:  options.appId,
          autoPush: options.autoPush || false,
          clientType: options.clientType || 'alipay',
          ignoreHttpDomainCheck: options.ignoreHttpDomainCheck || true,
          ignoreWebViewDomainCheck: options.ignoreWebviewDomainCheck || true,
          page: options['page'],
          pageQuery: options.pageQuery,
          query: options['query'],
          scene: options['scene'],
          bundleId: options.bundleId || 'com.alibaba.dingtalk',
        };
        
        try {
          const { qrcodeUrl, version, } = await minidev.preview(previewParams);
        
          // 生成的临时版本号，对于插件项目可以用于宿主进行插件联调
          ctx.logger.info('二维码地址', qrcodeUrl);
          ctx.logger.info('预览临时版本号', version);
        } catch(e) {
          ctx.logger.error(e.message);
        }
      },
    };
  },
});