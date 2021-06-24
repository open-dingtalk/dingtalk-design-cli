import CommandWrapper from '../../scheduler/command/commandWrapper';
import config from '../../lib/common/config';
import { EAppType, ECommandName, EStdioCommands, IWorkspaceRc, } from '../../lib/common/types';
import getGulpLocation from '../../lib/util/getGulpLocation';
import gulpInspector from '../../lib/util/gulpInspector';
import * as path from 'path';
import { GlobalStdinCommand, } from './stdioCommands';
import { launchIDEOnly, } from '../../lib/util/connectToIDE';
import { ProjectType, } from '../../lib/util/ideLocator';
import qrcodeAction from '../../actions/qrcode';
import pcPreviewAction from '../../actions/pcPreview';
import getJson from '../../lib/util/getJson';
import { fetchMatchIdeVersionConfig, MIN_IDE_VERSION_REQUIRED, } from '../../lib/util/ideLocator';
import { spawn, } from 'child_process';
import { isEmpty, } from 'lodash';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { isMacintosh, isWindows, } from '../../lib/cli-shared-utils';
import setJson, { setJsonItem, } from '../../lib/util/setJson';
import upload from '../../actions/upload';
import lint from '../../actions/lint';
import commmandsConfig from '../commandsConfig';
import { execSync, } from 'child_process';
import inquirer from 'inquirer';
import createPluginComponent from '../../actions/createPluginComponent';

const monitor = getMonitor(config.yuyanId);

interface ICommandOptions {
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.dev,
  registerCommand(ctx) {
    return {
      ...commmandsConfig.dev,
      action: async (options) => {
        ctx.logger.debug('cli options', options);
        
        const { 
          dtdConfig,
          cwd,
        } = ctx;

        if (!dtdConfig.type) {
          ctx.logger.error(`当前目录 ${cwd} 下没有找到 ${config.workspaceRcName} 文件，请先使用init初始化项目；或者也可以选择手动新增 ${config.workspaceRcName} 配置文件，参考文档 https://developers.dingtalk.com/document/resourcedownload/dingtalk-design-cli?pnamespace=app`);
          return;
        }

        const {
          type,
          typescript,
          base = '',
          outDir = '',
        } = dtdConfig;

        const dtdConfigPath = path.resolve(ctx.cwd, config.workspaceRcName);
        const isMp = type === EAppType.MP;
        const isH5 = type === EAppType.H5;
        const isPlugin = type === EAppType.PLUGIN;
        const isPcPlugin = type === EAppType.PLUGIN && dtdConfig.isPcPlugin;
        const isTs = typescript;
        
        ctx.watcher.init();
        ctx.watcher.watch([dtdConfigPath], () => {
          const dtdConfigUpdated: IWorkspaceRc = getJson(dtdConfigPath, true);
          if (!isEmpty(dtdConfigUpdated)) {
            ctx.logger.success('配置已更新');
            ctx.setDtdConfig(dtdConfigUpdated);
            // 更改ding.config.json不会触发IDE重新编译，所以需要写一遍mini.project.json来触发重新编译
            setJson(ctx.miniProgramConfigPath, ctx.miniProgramConfigContent);

            if (dtdConfigUpdated.isPcPlugin) {
              GlobalStdinCommand.subscribe({
                command: EStdioCommands.PC,
                description: '在当前命令行中敲入 「pc + 回车」 可以本地预览PC端工作台组件',
                action: () => {
                  const h5bundle = path.join(__dirname, '../../../h5bundle');
                  execSync(`cd ${h5bundle} && npm i`, {
                    stdio: 'inherit',
                  });
                  pcPreviewAction(ctx);
                },
              });
            }

            GlobalStdinCommand.log();
          } else {
            ctx.logger.error(`配置文件 ${config.workspaceRcName} 读取失败`);
          }
        });

        GlobalStdinCommand.bootstrap();
        GlobalStdinCommand.subscribe({
          command: EStdioCommands.HELP,
          description: '',
          serialized: false,
          action: async () => {
            GlobalStdinCommand.log();
          },
        });
        GlobalStdinCommand.subscribe({
          command: EStdioCommands.UPDATE_CONFIG,
          description: `在当前命令行中敲入 「updateConfig <配置文件中的某个字段> <更新后的值> + 回车」 会自动更新${config.workspaceRcName}，如 「updateConfig miniAppId 500000xxxxxx」`,
          action: async (args) => {
            const configKey = args[0];
            const configValue = args[1];
            setJsonItem(path.join(cwd, config.workspaceRcName), configKey, configValue);
          },
        });
        GlobalStdinCommand.subscribe({
          command: EStdioCommands.LINT,
          description: '在当前命令行中敲入 「lint + 回车」 会校验当前代码是否符合eslint规范（工作台组件除eslint规范外，会有额外的校验规则）',
          action: async () => {
            await lint(ctx);
            GlobalStdinCommand.tips();
          },
        });

        /**
         * dev和代码模版是强相关的，不支持非cli创建的项目
         * 区分场景：小程序、工作台组件、pc工作台组件、h5；不同场景下stdio命令不同
         * 区分语言：ts、js；ts需要先走一遍构建
         */
        if (isMp || isPlugin || isPcPlugin) {
          let projectType;
          if (isMp) projectType = ProjectType.DINGTALK_BIZ;
          if (isPlugin || isPcPlugin) projectType = ProjectType.DINGTALK_BIZ_WORKTAB_PLUGIN;

          GlobalStdinCommand.subscribe({
            command: EStdioCommands.IDE,
            description: '在当前命令行中敲入 「ide + 回车」 在小程序 IDE 中调试',
            action: async (args) => {
              try {
                // windows下不支持一键启动ide, 因为ide exe的地址无法便捷获取，所以不做自动下载
                if (isWindows) {
                  const ideBinPath = args[0];
                  if (ideBinPath) {
                    await launchIDEOnly(cwd, true, projectType, ideBinPath);
                  } else {
                    ctx.logger.warn(`windows下不支持一键自动启动ide，请手动下载大于 ${MIN_IDE_VERSION_REQUIRED} 版本的ide，在当前命令行敲入「ide <本地ide地址> + 回车」指定本地ide的地址`);
                    try {
                      const ideVersionInfo = await fetchMatchIdeVersionConfig();
                      if (ideVersionInfo.winUrl) {
                        ctx.logger.info(`建议下载的ide版本: ${ideVersionInfo.version}，下载地址: ${ideVersionInfo.winUrl}`);
                      }
                    } catch(e) {
                      monitor.logJSError(new Error(e));
                    }
                  }
                } else if (isMacintosh) {
                  await launchIDEOnly(cwd, true, projectType);
                } else {
                  ctx.logger.warn('本系统不支持该命令');
                }
              } catch(e) {
                monitor.logJSError(e);
              }
              GlobalStdinCommand.tips();
            },
          });

          GlobalStdinCommand.subscribe({
            command: EStdioCommands.QRCODE,
            description: '在当前命令行中敲入 「qrcode + 回车」 可以生成预览二维码',
            action: async () => {
              await qrcodeAction(ctx);
              GlobalStdinCommand.tips();
            },
          });

          GlobalStdinCommand.subscribe({
            command: EStdioCommands.UPLOAD,
            description: '在当前命令行中敲入 「upload + 回车」 可以上传小程序或工作台组件到开发者后台',
            action: async () => {
              let answers = {
                confirm: true,
              };

              if (isPlugin || isPcPlugin) {
                await lint(ctx);
                ctx.logger.tip('请注意工作台组件务必校验通过后再进行上传');

                answers = await inquirer.prompt([{
                  type: 'confirm',
                  name: 'confirm',
                  message: '请确认是否继续上传',
                }]);
              }

              if (answers.confirm) {
                await upload(ctx);
                GlobalStdinCommand.tips();
              }
            },
          });

          if (isPlugin) {
            GlobalStdinCommand.subscribe({
              command: EStdioCommands.CREATE_PLUGIN_COMPONENT,
              description: '在当前命令行中敲入 「createPluginComponent <componentName> + 回车」 可以在本地快速创建一个组件',
              action: async (args) => {
                await createPluginComponent(ctx, args);
              },
            });
          }

          if (isPcPlugin) {
            GlobalStdinCommand.subscribe({
              command: EStdioCommands.PC,
              description: '在当前命令行中敲入 「pc + 回车」 可以本地预览PC端工作台组件',
              action: async () => {
                const h5bundle = path.join(__dirname, '../../../h5bundle');
                execSync(`cd ${h5bundle} && npm i`, {
                  stdio: 'inherit',
                });
                pcPreviewAction(ctx);
              },
            });
          } else if (isTs) {
            const gulpLocation = getGulpLocation(cwd);
            if (!gulpLocation) {
              ctx.logger.error('当前环境找不到gulp，请先安装gulp');
              return;
            }

            gulpInspector(gulpLocation, {
              gulpfile: path.join(cwd, 'gulpfile.js'),
              src: path.resolve(base),
              dist: path.resolve(outDir),
              cwd,
            }, {
              onError: (err) => {
                monitor.logJSError(err);
              },
              onDone: () => {
                GlobalStdinCommand.log();
              },
            });
          }

          GlobalStdinCommand.log();
        } else if (isH5) {
          // h5默认都是react项目
          // TODO: h5的构建流程非标准，得梳理一下或者补充一下代码模版
          const cp = spawn(
            'npm',
            [
              'run',
              'start',
            ],
            {
              stdio: 'inherit',
              env: process.env,
              shell: isWindows,
            }
          );
          cp.on('error', (err) => {
            ctx.logger.error('h5项目启动失败', err.message);
            monitor.logJSError(err);
          });
        }
      },
    };
  },
});