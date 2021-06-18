import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import lint from '../../actions/lint';
import commmandsConfig from '../commandsConfig';
import config from '../../lib/common/config';

interface ICommandOptions {
}

/**
 * 不直接支持存量项目，但会引导支持，比如如何创建ding.config.json
 * 
 * 校验逻辑：
 * 插件
 * - 有miniAppId和token，拉取rc和权限点来校验
 * - 无miniAppId或token，用通用rc来校验，参考dingtalk-worktab-plugin-script中的defaultRc
 * 
 * 小程序/h5
 * - 存量项目，跑eslint
 * - 增量项目，执行 `npm run lint` / `npm run test`
 */
export default CommandWrapper<ICommandOptions>({
  name: ECommandName.lint,
  registerCommand(ctx) {
    return {
      ...commmandsConfig.lint,
      action: async (options) => {
        const {
          cwd,
          dtdConfig,
        } = ctx;

        if (!dtdConfig.type) {
          // TODO: 文档更新
          ctx.logger.error(`当前目录 ${cwd} 下没有找到 ${config.workspaceRcName} 文件，请先使用init初始化项目；或者也可以选择手动新增 ${config.workspaceRcName} 配置文件，参考文档xxx`);
          return;
        }
        await lint(ctx);
      },
    };
  },
});