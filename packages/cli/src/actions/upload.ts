import { sdk as opensdk, } from 'dingtalk-miniapp-opensdk';
import { EApiName, EAppType, EStdioCommands, ICommandContext, } from '../lib/common/types';
import { failSpinner, successSpinner, logWithSpinner, stopSpinner, } from '../lib/cli-shared-utils/lib/spinner';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';
import { EBuildStatusText, } from 'dingtalk-miniapp-opensdk/dist/types';
import { ICommandOptions, } from '../commands/upload';
import { get, } from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { setJsonItem, } from '../lib/util/setJson';

const monitor = getMonitor(config.yuyanId);

export default async (commandContext: ICommandContext, options?: ICommandOptions) => {
  commandContext.logger.debug('commandContext', commandContext);
  commandContext.logger.debug('options', options);

  const {
    dtdConfig,
    cwd,
    miniProgramConfigContent,
  } = commandContext;
        
  const miniAppId = get(options, 'miniAppId') + '' || dtdConfig.miniAppId;
  const token = get(options, 'token') || dtdConfig.token;
  const host = get(options, 'host');
  const override = get(options, 'override');

  if (!miniAppId || !token) {
    commandContext.logger.error('缺少必要参数 miniAppId 或 token');
    commandContext.logTips(dtdConfig.type, EStdioCommands.UPLOAD);
    return;
  }

  const version = get(options, 'version') || dtdConfig.version;
  if (override) {
    const dtdConfigPath = path.join(cwd, config.workspaceRcName);
    setJsonItem(dtdConfigPath, 'miniAppId', miniAppId);
    setJsonItem(dtdConfigPath, 'token', token);
    setJsonItem(dtdConfigPath, 'version', version);
  }

  // inquirer在输入时会默认输入回车
  // 这里先暂停监听，等inquirer问询结束后再开启监听
  // GlobalStdinCommand.dispose();

  // const answers: {
  //   version: string;
  // } = await inquirer.prompt([{
  //   type: 'input',
  //   name: '本次上传版本号',
  //   default: get(options, 'version'),
  //   message: '请确认本次上传的版本号',
  //   validate: (input) => {
  //     const isValid = semver.valid(input);
  //     if (!isValid) return '填入的版本号格式非法，需填入格式为x.x.x的版本号';
  //     if (dtdConfig && dtdConfig.version) {
  //       const isGt = semver.gt(input, dtdConfig.version);
  //       if (!isGt) return `填入的版本号小于 ${dtdConfig.version}, 请修改版本号，如: ${semver.inc(dtdConfig.version, 'patch')}`;
  //     }
  //     return true;
  //   },
  // }]);

  // GlobalStdinCommand.bootstrap();

  // 插件场景下校验有没有存在component.json，要提示开发者删除，否则云构建可能报错
  if (dtdConfig.type === EAppType.PLUGIN) {
    const componentJson = path.resolve(miniProgramConfigContent.pluginRoot, 'component.json');
    if(fs.existsSync(componentJson)) {
      commandContext.logger.error(`${componentJson}存在，可能导致该插件云构建异常，请手动删除。`);
      return;
    }
  }

  opensdk.setConfig({
    appKey: '',
    appSecret: '',
    accessToken: token,
    host: host || 'https://oapi.dingtalk.com',
  });

  monitor.logApiInvoke(EApiName.UPLOAD);

  let hasDone = false;
  const uploadCommonParams = {
    project: cwd,
    miniAppId,
    packageVersion: '',
  };

  try {
    await opensdk.miniUpload({
      ...uploadCommonParams,
      onProgressUpdate: (info) => {
        const {
          data = {} as any,
          status,
        } = info;

        commandContext.logger.debug('获取上传结果', info);

        monitor.logApiInvoke(EApiName.GET_UPLOAD_STATUS);

        // @ts-ignore
        const logId = path.basename(data.logUrl || '');
        // @ts-ignore
        const log = data.log;

        // @ts-ignore
        if (status === EBuildStatusText.success) {
          if (!hasDone) {
            successSpinner('构建成功');
            // @ts-ignore
            commandContext.logger.success('本次上传版本号', data.version);
            setJsonItem(path.join(commandContext.cwd, config.workspaceRcName), 'version', data.version);
            hasDone = true;
          }
        } else if (status === EBuildStatusText.building) {
          logWithSpinner(`构建中，正在查询构建结果。 ${logId ? `logId: ${logId}` : ''}`);
        } else if (status === EBuildStatusText.overtime) {
          failSpinner('构建超时，请重试');
          commandContext.logger.error(log);
          monitor.logApiError(EApiName.GET_UPLOAD_STATUS, EBuildStatusText.overtime, uploadCommonParams, info);
        } else if (status === EBuildStatusText.failed) {
          failSpinner('构建失败');
          commandContext.logger.error('构建失败，logId: ', logId);
          commandContext.logger.error(log);
          monitor.logApiError(EApiName.GET_UPLOAD_STATUS, EBuildStatusText.failed, uploadCommonParams, info);
        }
      },
    });
  } catch(e) {
    stopSpinner();
    commandContext.logger.error('上传失败', e.message);
    monitor.logApiError(EApiName.UPLOAD, e.message, uploadCommonParams, e.stack);
  }
};