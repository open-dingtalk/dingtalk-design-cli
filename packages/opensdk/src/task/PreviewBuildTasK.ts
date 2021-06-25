import fs from 'fs-extra';
import { ECompileType, EBuildTarget, INormalBuildPackResult, ISubPackageResult, IPluginBuildPackResult, } from '../types';
import { getEnableTabBar, getMainPage, getPluginRefs, } from '../config/appConfig';
// import { tracker } from '../log';
import { IPreviewBuildParams, ISubPackage, } from '../openapi';
import { BuildStatusEnum, BuildStatusText, } from '../types';
import { friendlyPackageSize, } from '../utils';
import { ITaskOptionBase, TaskBase, } from './TaskBase';
import superagent from 'superagent';
import chalk from 'chalk';
import * as qrcode from 'qr-image';
import * as consolePng from 'console-png';

consolePng.attachTo(console);

// 6.2.3
const buildScriptVersion = '6.2.3'; // eslint-disable-line

export interface IPreviewBuildOptions extends ITaskOptionBase {
  page?: string;
  query?: string;
  corpId?: string;
  ignoreHttpReqPermission?: boolean;
  ignoreWebViewDomainCheck?: boolean;
  buildTarget: EBuildTarget;
}

/**
 * fetch channelId
 */
export async function fetchChannelId() {
  const { text: channelId, } = await superagent.get(
    'https://openchannel.alipay.com/group/apply.do?scene=tinyAppDebug&roleType=IDE&source=dingtalk',
  );
  return channelId;
}

/**
 * fetch channelId
 */
export async function fetchTyroId() {
  const { text: tyroId, } = await superagent.get(
    'https://hpmweb.alipay.com/tyro/uuid',
  );
  return tyroId;
}

/**
 * fetch debugParams
 */
export interface IDebugParams {
  tyroId: string;
  channelId: string;
}

/**
 * fetch debugParams
 */
export async function fetchDebugParams(): Promise<IDebugParams> {
  // const channelId = await fetchChannelId();
  const tyroId = await fetchTyroId();
  return {
    channelId: tyroId,
    tyroId,
  };
}

export function getWebDevToolsPage({ channelId, tyroId, }: IDebugParams): string {
  return `https://render.alipay-eco.com/p/s/devtools-web/index.html?ch2=${tyroId}&chInfo=local`;
}

export class PreviewBuildTask extends TaskBase<IPreviewBuildOptions> {
  async start() {
    const { context, PREVIEW_PACKAGE_SIZE_LIMIT, } = this;
    const { options, } = context;
    const startTime = Date.now();

    await this.openApi.init();

    const debugParams = await fetchDebugParams();

    await fs.emptyDir(this.outputDir);
    
    const runLocalBuildParams = {
      appId: options.miniAppId,
      input: this.projectDir,
      output: this.outputDir,
      buildTarget: options.buildTarget || EBuildTarget.RemoteX,
      clientType: 'dingtalk',
      remoteConfig: debugParams,
      ignoreDebugInjectCode: false,
    };
    const compiler = await this.getCompiler();
    const compileResult = await compiler.runLocalBuild(runLocalBuildParams);
    // compileResult = compileResult.appxWeb || compileResult;
    // this.print("本地构建完成");

    let packageKey = '';
    let pluginPackageKey = '';
    let subPackages: ISubPackage[] = [];

    const tarFilePath = compileResult.compileType === ECompileType.Plugin ? (<IPluginBuildPackResult>compileResult).client.tarFilePath : (<INormalBuildPackResult>compileResult).tarFilePath;

    const tarFileSize = fs.statSync(tarFilePath).size;
    if (tarFileSize > PREVIEW_PACKAGE_SIZE_LIMIT) {
      throw new Error(`当前包体积${friendlyPackageSize(tarFileSize)}，超过${friendlyPackageSize(PREVIEW_PACKAGE_SIZE_LIMIT)}，请优化包体积`);
    }

    if (tarFilePath) {
      packageKey = await this.openApi.upload({
        miniAppId: options.miniAppId,
        src: tarFilePath,
        extname: '.tar',
      });
    }

    if (compileResult.compileType === ECompileType.Plugin) {
      pluginPackageKey = await this.openApi.upload({
        miniAppId: options.miniAppId,
        src: compileResult.plugin.tarFilePath,
        extname: '.tar',
      });
    }

    if (compileResult.enableSubPack) {
      subPackages = await this.transformSubPackage(compileResult.subPackages);
    }

    // const devUrl = await getWebDevToolsPage(debugParams);
    // console.log(devUrl);
    
    // runLocalBuildParams
    const previewParams: IPreviewBuildParams = {
      miniapp_id: options.miniAppId,
      package_key: packageKey || pluginPackageKey,
      page: options.page,
      main_page: getMainPage(context.appConfig),
      query: options.query,
      corp_id: options.corpId,
      sub_packages: subPackages,
      plugin_package_key: pluginPackageKey,
      plugin_refs: getPluginRefs(context.appConfig),
      plugin_type: compileResult.compileType == ECompileType.Plugin ? 'WIDGET' : undefined,
      enable_tabbar: getEnableTabBar(context.appConfig),
      ignore_http_req_permission: options.ignoreHttpReqPermission,
      ignore_webview_domain_check: options.ignoreWebViewDomainCheck,
      build_script_version: buildScriptVersion,
      // is_remote_x: true,
      // channel: debugParams.channelId,
      // tyroid: debugParams.tyroId,
    };
    if (runLocalBuildParams.buildTarget === EBuildTarget.RemoteXLite) {
      previewParams.is_remote_x = true;
      previewParams.channel = debugParams.channelId;
      previewParams.tyroid = debugParams.tyroId;
    }

    const task = await this.openApi.createPreviewBuildTask(previewParams);

    return new Promise<string>((resolve, reject) => {
      const start = Date.now();
      const timeout = 2 * 60 * 1000;
      const timer = setInterval(() => {
        const current = Date.now();
        const duration = current - start;

        this.openApi.getPreviewBuildStatus({
          miniapp_id: options.miniAppId,
          task_id: task.task_id,
        }).then(result => {
          this.print({
            status: BuildStatusText[result.finished ? BuildStatusEnum.SUCCESS : BuildStatusEnum.BUILDING],
            data: null,
          });

          if (result.finished) {
            clearInterval(timer);
            const buffer = qrcode.imageSync(result.result_url, {
              size: 1,
              margin: 0,
            });
            console['png'](buffer);
            console.log(chalk.green('scheme:'), result.result_url);
            resolve(result.result_url || '');

            // tracker.retCode(EBuildTarget.Preview, true, Date.now() - startTime, options.miniAppId);
          } else {
            if (duration > timeout) {
              clearInterval(timer);
              reject(new Error('preview build overtime'));
              // tracker.retCode(EBuildTarget.Preview, false, Date.now() - startTime, '超时');
            }
          }
        }, e => {
          clearInterval(timer);
          reject(e);
          // tracker.retCode(EBuildTarget.Preview, false, Date.now() - startTime, e.message);
        });
      }, 2000);
    });
  }

  async transformSubPackage(items: ISubPackageResult[]): Promise<ISubPackage[]> {
    const { SUBPACKAGE_SINGLE_SIZE_LIMIT, SUBPACKAGE_WHOLE_SIZE_LIMIT, context, } = this;
    const { options, } = context;

    const p1 = [] as Array<{ type: string; path: string; filePath: string; size: number; }>;

    for (const pkg of items) {
      const tmpfile = pkg.tarFilePath;
      const t = {
        type: pkg.type,
        path: pkg.path,
        filePath: tmpfile,
        size: fs.statSync(pkg.tarFilePath).size,
      };

      if (t.size > SUBPACKAGE_SINGLE_SIZE_LIMIT) {
        throw new Error(`分包${t.path}超出${friendlyPackageSize(SUBPACKAGE_SINGLE_SIZE_LIMIT)}体积限制，请优化体积`);
      }

      p1.push(t);
    }

    const wholeSize = p1.reduce((a, c) => a + c.size, 0);

    if (wholeSize && wholeSize > SUBPACKAGE_WHOLE_SIZE_LIMIT) {
      throw new Error(
        `分包后总包体积为${friendlyPackageSize(wholeSize)}，超出${friendlyPackageSize(SUBPACKAGE_WHOLE_SIZE_LIMIT)}体积限制，请优化体积`
      );
    }

    const parsedItems = [] as Array<{ type: string; path: string; package_key: string; }>;

    for (const pkg of p1) {
      parsedItems.push({
        type: pkg.type,
        path: pkg.path,
        package_key: await this.openApi.upload({
          miniAppId: options.miniAppId,
          src: pkg.filePath,
          extname: '.tar',
        }),
      });
    }

    return parsedItems;
  }
}