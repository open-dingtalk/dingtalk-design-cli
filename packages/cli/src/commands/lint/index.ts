import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../../lib/common/config';
import lint from '../../actions/lint';
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
      command: {
        name: ECommandName.lint,
        description: '校验钉钉小程序、h5、工作台组件的代码规范和平台要求规范',
      },
      action: async (options) => {
        await lint(ctx);
      },
    };
  },
});