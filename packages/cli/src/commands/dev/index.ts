import yeomanRuntime from 'yeoman-environment';
import CommandWrapper from '../../scheduler/command/commandWrapper';
import config from '../../lib/common/config';
import { EAppType, IWorkspaceRc, } from '../../lib/common/types';
import getGulpLocation from '../../lib/util/getGulpLocation';
import tscInspector from '../../lib/util/gulpInspector';
import gulpInspector from '../../lib/util/gulpInspector';
import * as path from 'path';
import { GlobalStdinCommand, } from './stdioCommands';
import { launchIDEOnly, } from '../../lib/util/connectToIDE';
import { ProjectType, } from '../../lib/util/ideLocator';
import qrcodeAction from '../../actions/qrcode';
import pcPreviewAction from '../../actions/pcPreview';
import getJson from '../../lib/util/getJson';
import { spawn, } from 'child_process';

interface ICommandOptions {
}

export default CommandWrapper<ICommandOptions>({
  name: 'dev',
  registerCommand(ctx) {
    return {
      command: {
        name: 'dev',
        description: '创建一个钉钉应用，可以是小程序、h5、工作台组件',
      },
      options: {
      },
      action: async (options) => {
        ctx.logger.debug('cli options', options);
        
        const { 
          dtdConfig,
          cwd,
        } = ctx;

        if (!dtdConfig) {
          ctx.logger.error('当前目录 ${this.commandContext.cwd} 下没有找到 ${config.workspaceRc} 文件，请先使用init初始化项目');
          return;
        }

        const {
          type,
          typescript,
          base,
          outDir,
        } = dtdConfig;

        const dtdConfigPath = path.resolve(ctx.cwd, config.workspaceRc);
        const isMp = type === EAppType.MP;
        const isH5 = type === EAppType.H5;
        const isPlugin = type === EAppType.PLUGIN;
        const isPcPlugin = type === EAppType.PLUGIN && dtdConfig.isPcPlugin;
        const isTs = typescript;
        
        GlobalStdinCommand.bootstrap();
        ctx.watcher.init();
        ctx.watcher.watch([dtdConfigPath], () => {
          const dtdConfigUpdated: IWorkspaceRc = getJson(dtdConfigPath, true, null);
          if (dtdConfigUpdated) {
            ctx.setDtdConfig(dtdConfigUpdated);
            console.log(GlobalStdinCommand.toString());
          } else {
            ctx.logger.error(`配置文件 ${config.workspaceRc} 读取失败`);
          }
          
        });

        /**
         * dev和代码模版是强相关的，不支持非cli创建的项目
         * 区分场景：小程序、插件、pc工作台插件、h5；不同场景下stdio命令不同
         * 区分语言：ts、js；ts需要先走一遍构建
         */
        if (isMp || isPlugin || isPcPlugin) {
          let projectType;
          if (isMp) projectType = ProjectType.DINGTALK_BIZ;
          if (isPlugin || isPcPlugin) projectType = ProjectType.DINGTALK_BIZ_WORKTAB_PLUGIN;

          GlobalStdinCommand.subscribe({
            command: 'ide',
            description: '在当前命令行中敲入 「ide + 回车」 在小程序 IDE 中调试',
            action: () => {
              launchIDEOnly(path.resolve(outDir), true, projectType);
            },
          });

          GlobalStdinCommand.subscribe({
            command: 'qrcode',
            description: '在当前命令行中敲入 「qrcode + 回车」 可以生成预览二维码',
            action: () => {
              qrcodeAction(ctx);
            },
          });

          if (isPcPlugin) {
            GlobalStdinCommand.subscribe({
              command: 'pc',
              description: '在当前命令行中敲入 「p + 回车」 可以本地预览PC端工作台插件',
              action: () => {
                pcPreviewAction(ctx);
              },
            });
          } else if (isTs) {
            const gulpLocation = getGulpLocation();
            if (!gulpLocation) {
              ctx.logger.error('当前环境找不到gulp，请先安装gulp');
              return;
            }

            gulpInspector(gulpLocation, {
              gulpfile: path.join(cwd, 'gulpfile.js'),
              src: path.resolve(base),
              dist: path.resolve(outDir),
              cwd,
            });
          }

          console.log(GlobalStdinCommand.toString());
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
            }
          );
          cp.on('error', (err) => {
            ctx.logger.error('h5项目启动失败', err.message);
          });
        }
      },
    };
  },
});