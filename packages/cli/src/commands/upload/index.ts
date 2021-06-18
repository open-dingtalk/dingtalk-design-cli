import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import upload from '../../actions/upload';
import commmandsConfig from '../commandsConfig';
import config from '../../lib/common/config';

export interface ICommandOptions {
  miniAppId?: string;
  version?: string;
  token?: string;
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.upload,
  registerCommand(ctx) {
    return {
      ...commmandsConfig.upload,
      action: async (options) => {
        const {
          dtdConfig,
          cwd,
        } = ctx;

        if (!dtdConfig.type) {
          ctx.logger.error(`当前目录 ${cwd} 下没有找到 ${config.workspaceRcName} 文件，请先使用init初始化项目；或者也可以选择手动新增 ${config.workspaceRcName} 配置文件，参考文档 https://developers.dingtalk.com/document/resourcedownload/dingtalk-design-cli?pnamespace=app`);
          return;
        }
        await upload(ctx, options);
      },
    };
  },
});