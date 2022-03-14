/**
 * 目前仅服务于钉钉inside小程序场景
 * 
 * 参考：https://yuque.antfin.com/docs/share/f5fdcc3d-e6ec-4f00-b598-0bda87a55aa0?#
 */

import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import commandsConfig from '../commandsConfig';
import { minidev, } from 'minidev';

interface ICommandOptions {
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.login,
  registerCommand(ctx) {
    return {
      ...commandsConfig.login,
      action: async (options) => {
        ctx.logger.debug('cli options', options);

        await minidev.login({
          clientType: 'alipay',
        }, 
        // @ts-ignore
        (loginTask) => {
          // Node.js API 方式可以通过第二个参数获取 loginTask 以便后续展示等
          loginTask.on('qrcode-generated', (qrcodeUrl) => {
            // 已获取登录图片，进行后续展示
            // ctx.logger.info(qrcodeUrl);
          });
        
          loginTask.on('polling', (remainingMs) => {
            // ctx.logger.info(`二维码过期时间: ${Math.floor(remainingMs / 1000)}s`);
          });
        
          loginTask.on('success', (remainingMs) => {
            // ctx.logger.info('完成授权');
          });
        
          loginTask.on('scan', (remainingMs) => {
            // ctx.logger.info('已扫描, 请在手机上确认');
          });
        });
      },
    };
  },
});