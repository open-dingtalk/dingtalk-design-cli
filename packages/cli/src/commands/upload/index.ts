import CommandWrapper from '../../scheduler/command/commandWrapper';
import config from '../../lib/common/config';
import { ECommandName, } from '../../lib/common/types';
import upload from '../../actions/upload';

export interface ICommandOptions {
  miniAppId?: string;
  version?: string;
  token?: string;
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.upload,
  registerCommand(ctx) {
    return {
      command: {
        name: ECommandName.upload,
        description: '上传钉钉小程序或工作台组件',
      },
      options: {
        miniAppId: {
          description: `[可选] 钉钉小程序或工作台组件的miniAppId。默认从当前工作目录下的 ${config.workspaceRcName} 中读取`,
          type: 'string',
        },
        version: {
          description: `[可选] 本次上传版本号，格式为x.x.x，需要大于已上传的版本号。默认从当前工作目录下的 ${config.workspaceRcName} 中读取`,
          type: 'string',
        },
        token: {
          // TODO: 参考链接修改
          description: `[可选] 开发者工具密钥，默认从当前工作目录下的 ${config.workspaceRcName} 中读取，密钥生成方式参考 xxx`,
          type: 'string',
        },
      },
      action: async (options) => {
        await upload(ctx, options);
      },
    };
  },
});