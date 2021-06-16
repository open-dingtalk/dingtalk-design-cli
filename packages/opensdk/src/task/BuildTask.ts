import md5File from 'md5-file';
import semver from 'semver';
import { ECompileType, } from '../types';
import { getEnableTabBar, getMainPage, getPluginRefs, } from '../config/appConfig';
import { ApplicationTypeEnum, BuildStatusEnum, BuildStatusText, } from '../types';
import { friendlyPackageSize, } from '../utils';
import { ITaskOptionBase, TaskBase, } from './TaskBase';

export interface IBuildTaskParams extends ITaskOptionBase {
  packageVersion?: string;
}

export interface IBuildTaskResult {
  subApplicationType: ApplicationTypeEnum;
  // packages: Array<{
  //   /** 类型，整包，主包，分包 */
  //   type: "WHOLE" | "MAIN" | "SUB";
  //   /** 上传包名字 */
  //   name: string;
  //   /** 上传包尺寸，单位KB */
  //   size: number;
  // }>;
  packageVersion: string;
}

function tryParseJSON<T>(c: string | undefined): T | undefined {
  if (!c) {
    return;
  }

  try {
    return JSON.parse(c);
  } catch (e) {
    return;
  }
}

export class BuildTask extends TaskBase<IBuildTaskParams> {
  async start() {
    // this.print('开始上传');
    const { context, PREVIEW_PACKAGE_SIZE_LIMIT, } = this;
    const { appConfig, options, } = context;
    // const startTime = Date.now();

    if (options.packageVersion && !semver.valid(options.packageVersion)) {
      throw new Error(`非法的版本号:${options.packageVersion}`);
    }

    const compiler = await this.getCompiler();
    // TODO: 打包产物校验
    const packSourceResult = await compiler.runPackSource({
      input: this.projectDir,
      output: this.outputDir,
      fileName: 'dist.tar',
    });

    if (packSourceResult.size > PREVIEW_PACKAGE_SIZE_LIMIT) {
      throw new Error(`当前包体积为${friendlyPackageSize(packSourceResult.size)}，超出${friendlyPackageSize(PREVIEW_PACKAGE_SIZE_LIMIT)}限制，请优化包体积`);
    }

    await this.openApi.init();

    const md5 = await md5File(packSourceResult.zipFile);
    const packageKey = await this.openApi.upload({
      miniAppId: options.miniAppId,
      src: packSourceResult.zipFile,
    });

    const task = await this.openApi.createBuildTask({
      miniapp_id: options.miniAppId,
      package_key: packageKey,
      package_md5: md5,
      enable_tabbar: getEnableTabBar(appConfig),
      main_page: getMainPage(appConfig),
      package_version: options.packageVersion,
      plugin_refs: getPluginRefs(appConfig),
    });

    return new Promise<IBuildTaskResult>((resolve, reject) => {
      const start = Date.now();
      // 设定一个30分钟的超时
      const timeout = 30 * 60 * 1000;
      const timer = setInterval(() => {
        this.openApi.getBuildStatus({
          miniapp_id: options.miniAppId,
          task_id: task.task_id,
        }).then(result => {
          interface IBuildInfo {
            packageUrl: string;
            logUrl: string;
            version: string;
            status: BuildStatusEnum;
            detail: string;
          }

          interface IBuildDetail {
            created: string;
            started: string;
            finished: string;
            log: string;
            logUrl: string;
            status: BuildStatusEnum;
            resultUrl: string;
          }

          const buildInfoStr = decodeURIComponent(result.build_info);
          const buildInfo = tryParseJSON<IBuildInfo>(buildInfoStr);
          const detail = tryParseJSON<IBuildDetail>(buildInfo?.detail);
          
          this.print<{
            logUrl?: string;
            log?: string;
            version: string;
          }>({
            status: BuildStatusText[result.status],
            data: {
              logUrl: buildInfo?.logUrl,
              log: detail?.log,
              version: result.version,
            },
          });

          if (result.finished) {
            /**
             * IDE逻辑：通过判定versionCreated来确定是否构建成功
             * 
             */
            clearInterval(timer);

            if (result.status === BuildStatusEnum.SUCCESS) {
              resolve({
                subApplicationType: context.projectConfig.compileType === ECompileType.Plugin ? ApplicationTypeEnum.TINYAPP_PLUGIN : ApplicationTypeEnum.TINYAPP_NORMAL,
                packageVersion: result.version,
              });
              // tracker.retCode(EBuildTarget.Publish, true, Date.now() - startTime, options.miniAppId);
            } else {
              reject();
              // tracker.retCode(EBuildTarget.Publish, false, Date.now() - startTime, options.miniAppId);
            }

            return;
          }

          if (Date.now() - start > timeout) {
            clearInterval(timer);
            reject(new Error('构建超时'));
            // tracker.retCode(EBuildTarget.Publish, false, Date.now() - startTime, '超时');
          }
        }, e => {
          this.print(e.message);
          clearInterval(timer);
          reject(e);
          // tracker.retCode(EBuildTarget.Publish, false, Date.now() - startTime, e.message);
        });
      }, 5000);
    });
  }
}