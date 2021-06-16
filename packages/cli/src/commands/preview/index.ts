import CommandWrapper from '../../scheduler/command/commandWrapper';
import qrcode from '../../actions/qrcode';
import { EAppType, ECommandName, } from '../../lib/common/types';

interface ICommandOptions {
  miniAppId?: string;
  version?: string;
  token?: string;
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.preview,
  registerCommand(ctx) {
    return {
      command: {
        name: ECommandName.preview,
        description: '生成二维码，扫码预览本地构建出来的小程序或插件',
      },
      options: {},
      action: async (options) => {
        const {
          dtdConfig,
        } = ctx;

        if ([EAppType.MP, EAppType.PLUGIN].indexOf(dtdConfig.type as EAppType) === -1) {
          ctx.logger.error('preview命令只支持小程序或插件');
          return;
        }

        qrcode(ctx);
      },
    };
  },
});