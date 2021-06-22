import { EAppType, ICommandContext, } from '../lib/common/types';
import eslint from 'eslint';
import pluginEl from 'dingtalk-worktab-plugin-script';
import { logWithSpinner, stopSpinner, } from '../lib/cli-shared-utils/lib/spinner';
import getValidateRc from '../lib/util/getValidateRc';
import { spawnSync, } from 'child_process';


export default async (commandContext: ICommandContext): Promise<void> => {
  // 对于小程序和h5，区分是否有eslintrc的场景
  // 对于工作台组件，区分是否有miniAppId/token的场景
  const { dtdConfig, hasOriginDtdConfig, miniProgramConfigContent, } = commandContext;
  if (!miniProgramConfigContent) {
    commandContext.logger.error('当前目录下找不到mini.project.json，请在小程序或工作台组件工作目录下运行');
    return;
  }

  const {
    type: appType,
    miniAppId,
    token,
  } = dtdConfig;
  const cwd = commandContext.cwd;

  if ([EAppType.H5, EAppType.MP].indexOf(appType as EAppType) !== -1) {
    if (!hasOriginDtdConfig) {
      const eslinter = new eslint.ESLint({
        cwd,
      });
      const res = await eslinter.lintFiles(['**']);
      commandContext.logger.info(res);
    } else {
      try {
        spawnSync(
          'npm',
          [
            'run',
            'lint',
            '--color',
          ],
          {
            stdio: 'inherit',
            cwd,
            env: process.env,
          },
        );
        commandContext.logger.info('校验结束（没有输出代表校验通过）');
      } catch(e) {
        commandContext.logger.error('校验出错:', e);
      }
    }
  } else if (appType === EAppType.PLUGIN) {
    const pluginRoot = miniProgramConfigContent.pluginRoot;
    if (!pluginRoot) {
      commandContext.logger.error('mini.project.json中没有声明pluginRoot，无法找到工作台组件根目录');
      return;
    }

    if (!hasOriginDtdConfig || !miniAppId || !token) {
      const res = await pluginEl(pluginRoot);
      commandContext.logger.warn('当前项目目录中读取不到miniAppId和token，校验时将使用标准规则');
      commandContext.logger.info(res.data);
      return;
    }

    if (miniAppId && token) {
      logWithSpinner('正在拉取当前工作台组件的权限包');
      const rcJson = await getValidateRc(miniAppId, token, dtdConfig.isPcPlugin);
      logWithSpinner('正在校验');
      const res = await pluginEl(pluginRoot, rcJson);
      stopSpinner('校验完成');
      commandContext.logger.info(res.data);
    }
  }
};