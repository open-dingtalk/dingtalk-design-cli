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
        });
      },
    };
  },
});
