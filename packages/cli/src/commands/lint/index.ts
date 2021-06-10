import CommandWrapper from '../../scheduler/command/commandWrapper';
import { EAppType, ECommandName, } from '../../lib/common/types';
import eslint from 'eslint';
import pluginEl from '@ali/dingtalk-worktab-plugin-script';
import { exec, } from 'child_process';
import { logWithSpinner, stopSpinner, } from '../../lib/cli-shared-utils/lib/spinner';
import getValidateRc from '../../lib/util/getValidateRc';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../../lib/common/config';

interface ICommandOptions {
}

const monitor = getMonitor(config.yuyanId);

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.lint,
  registerCommand(ctx) {
    return {
      command: {
        name: ECommandName.lint,
        description: '校验钉钉小程序、h5、工作台组件的代码规范和平台要求规范',
      },
      action: async (options) => {
        // 对于小程序和h5，区分是否有eslintrc的场景
        // 对于插件，区分是否有miniAppId/token的场景
        const { dtdConfig, hasOriginDtdConfig, miniProgramConfigContent, } = ctx;

        if (!miniProgramConfigContent) {
          ctx.logger.error('当前目录下找不到mini.project.json，请在小程序或插件工作目录下运行');
          return;
        }

        const {
          type: appType,
          miniAppId,
          token,
        } = dtdConfig;
        const cwd = ctx.cwd;

        if ([EAppType.H5, EAppType.MP].indexOf(appType as EAppType) !== -1) {
          if (!hasOriginDtdConfig) {
            const eslinter = new eslint.ESLint({
              cwd,
            });
            const res = await eslinter.lintFiles(['**']);
            ctx.logger.info(res);
          } else {
            const cp = exec('npm run lint');
            cp.stdout.on('data', (chunk) => {
              const msg = chunk.toString();
              ctx.logger.info(msg);
            });
            cp.on('error', (err) => {
              monitor.logJSError(err);
              ctx.logger.error('lint执行失败', err);
            });
          }
        } else if (appType === EAppType.PLUGIN) {
          const pluginRoot = miniProgramConfigContent.pluginRoot;
          if (!pluginRoot) {
            ctx.logger.error('mini.project.json中没有声明pluginRoot，无法找到插件根目录');
            return;
          }

          if (!hasOriginDtdConfig || !miniAppId || !token) {
            const res = await pluginEl(pluginRoot);
            ctx.logger.warn('当前项目目录中读取不到miniAppId和token，校验时将使用标准规则');
            ctx.logger.info(res.data);
          }

          if (miniAppId && token) {
            logWithSpinner('正在拉取当前工作台组件的权限包');
            const rcJson = await getValidateRc(miniAppId, token);
            logWithSpinner('正在校验');
            const res = await pluginEl(pluginRoot, rcJson);
            stopSpinner('校验完成');
            ctx.logger.info(res.data);
          }
        }
      },
    };
  },
});