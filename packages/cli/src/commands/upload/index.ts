import yeomanRuntime from 'yeoman-environment';
import CommandWrapper from '../../scheduler/command/commandWrapper';
import config from '../../lib/common/config';
import getJson from '../../lib/util/getJson';
import * as path from 'path';
import inquirer from 'inquirer';
import semver from 'semver';
import { sdk as opensdk, } from 'dingtalk-miniapp-opensdk';
import { failSpinner, logWithSpinner, stopSpinner, successSpinner, } from '../../lib/cli-shared-utils/lib/spinner';
import { EBuildStatusText, } from 'dingtalk-miniapp-opensdk/dist/types';
import { EApiName, ECommandName, } from '../../lib/common/types';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';

interface ICommandOptions {
  miniAppId?: string;
  version?: string;
  token?: string;
}

const monitor = getMonitor(config.yuyanId);

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
          description: `[可选] 钉钉小程序或工作台组件的miniAppId。默认从当前工作目录下的 ${config.workspaceRc} 中读取`,
          type: 'string',
        },
        version: {
          description: `[可选] 本次上传版本号，格式为x.x.x，需要大于已上传的版本号。默认从当前工作目录下的 ${config.workspaceRc} 中读取`,
          type: 'string',
        },
        token: {
          // TODO: 参考链接修改
          description: `[可选] 开发者工具密钥，默认从当前工作目录下的 ${config.workspaceRc} 中读取，密钥生成方式参考 xxx`,
          type: 'string',
        },
      },
      action: async (options) => {
        const rcContent = ctx.dtdConfig;
        
        const miniAppId = options.miniAppId || rcContent.miniAppId;
        const token = options.token || rcContent.token;

        if (!miniAppId || !token) {
          ctx.logger.error('缺少必要参数 miniAppId 或 token，请参考文档 xxx');
          return;
        }

        const answers: {
          version: string;
        } = await inquirer.prompt([{
          type: 'input',
          name: '本次上传版本号',
          default: options.version,
          message: '请确认本次上传的版本号',
          validate: (input) => {
            const isValid = semver.valid(input);
            if (!isValid) return '填入的版本号格式非法，需填入格式为x.x.x的版本号';
            
            if (rcContent && rcContent.version) {
              const isGt = semver.gt(input, rcContent.version);
              if (!isGt) return `填入的版本号小于 ${rcContent.version}, 请修改版本号，如: ${semver.inc(rcContent.version, 'patch')}`;
            }

            return true;
          },
        }]);

        opensdk.setConfig({
          appKey: '',
          appSecret: '',
          accessToken: rcContent.token,
          host: 'https://pre-oapi.dingtalk.com',
        });

        monitor.logApiInvoke(EApiName.UPLOAD);

        const uploadCommonParams = {
          project: ctx.cwd,
          miniAppId: rcContent.miniAppId,
          packageVersion: answers.version,
        };

        try {
          await opensdk.miniUpload({
            ...uploadCommonParams,
            onProgressUpdate: (info) => {
              const {
                data,
                status,
              } = info;

              monitor.logApiInvoke(EApiName.GET_UPLOAD_STATUS);

              // @ts-ignore
              const logId = path.basename(data.logUrl);
              // @ts-ignore
              const log = data.log;

              // @ts-ignore
              if (status === EBuildStatusText.success) {
                successSpinner('构建成功');
                // @ts-ignore
                ctx.logger.success('本次上传版本号', data.version);
              } else if (status === EBuildStatusText.building) {
                logWithSpinner('构建中，正在查询构建结果， logId: ', logId);
              } else if (status === EBuildStatusText.overtime) {
                failSpinner('构建超时，请重试');
                ctx.logger.error(log);
                monitor.logApiError(EApiName.GET_UPLOAD_STATUS, EBuildStatusText.overtime, uploadCommonParams, info);
              } else if (status === EBuildStatusText.failed) {
                failSpinner('构建失败');
                ctx.logger.error('构建失败，logId: ', logId);
                ctx.logger.error(log);
                monitor.logApiError(EApiName.GET_UPLOAD_STATUS, EBuildStatusText.failed, uploadCommonParams, info);
              }
            },
          });
        } catch(e) {
          stopSpinner();
          ctx.logger.error('上传失败', e);
          monitor.logApiError(EApiName.UPLOAD, e.message, uploadCommonParams, e.stack);
        }
      },
    };
  },
});