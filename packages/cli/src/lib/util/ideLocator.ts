/**
 * 检查本地是否有符合版本要求的IDE，如果未安装或版本不匹配则代用户下载指定版本IDE，具体判断逻辑见getOrDownloadIDE注释
 * 最终返回值为一个可用的IDE安装根目录，如/Applications/
 *
 * 目前暂不支持windows
 *
 */
import semver from 'semver';
import path from 'path';
import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';
import mkdirp from 'mkdirp';
import EasyDl from 'easydl';
import { execSync, } from 'child_process';
import os from 'os';
import urllib from 'urllib';
import config from '../common/config';
import ProgressBar from 'progress';
import getJson from './getJson';
import { IGlobalRc, } from '../common/types';
import { setGlobalRc, } from './globalRc';
import { spawn, } from 'child_process';
import { isWindows, } from '../cli-shared-utils/lib/env';
import yargsUnParser from 'yargs-unparser';
import { URI, } from 'vscode-uri';

const MacDefaultInstallRoot = '/Applications/';
 
export const MIN_IDE_VERSION_REQUIRED = '2.1.0';
 
const localConfigPath = config.globalRc;
 
/**
  * data数据结构为DownloadConfig，
  * IDE各版本信息以数组形式存储，以避免旧版本mini无法最新版本IDE对兼容（IDE添加新的联动能力也会依赖mini的更新）
  * version表示实际的版本号，compatVersion表示对应的mini版本兼容
  * 举例：
  * - v1版本mini联动能力需要最低1.19.0的IDE，则compatVersion取1.19.0，实际IDE因为修bug等原因更新到了1.19.3，则version和url均随之更新
  * - v2版本mini联动能力需要最低2.1.0的IDE，则添加一条新记录，compatVersion取2.1.0，version根据实际情况填2.1.1、2.1.2等
  */
const IDE_VERSIONS_CONFIG_URL = 'https://hudong.alicdn.com/api/data/v2/a50157f4d12e45babf368ca969d2066a.js?t=1623403902942';
 
const MINI_STUDIO_BIN_PATH_IN_MAC =
  '小程序开发者工具.app/Contents/MacOS/小程序开发者工具';

const MINI_STUDIO_BIN_PATH_IN_WIN = '小程序开发者工具\\小程序开发者工具.exe';

export const locateMiniStudioBinPath = (installRoot: string): string =>
  path.join(
    installRoot,
    isWindows ? MINI_STUDIO_BIN_PATH_IN_WIN : MINI_STUDIO_BIN_PATH_IN_MAC,
  );

const IDELaunchArgsType = {
  string: [
    'nodeIpcPath',
    'webSocketAddress',
    'connectionType',
    'windowMode',
    'projectUri',
    'projectType',
    'volDriverChannelName',
    'volDriverLaunchMode',
    'volDriverToken',
    'appId',
  ],
  boolean: ['disablePublish', 'forceLite', 'remoteDev'],
  array: ['volDriverRemoteSupportedMethods'],
};

 interface VersionInfo {
   macUrl: string;
   winUrl: string;
   version: string;
   compatVersion: string;
 }
 
 interface DownloadConfig {
   versions: VersionInfo[];
 }

type IDEWindowMode = 'lite' | 'default';

/**
 * IDE的两种启动模式
 * - launchAndHost：启动并由外部托管编译等
 * - launchOnly：纯启动
 */
type IDELaunchMode = 'launchAndHost' | 'launchOnly';

/**
 * IDE中支持的项目类型
 * 曾经因为只有支付宝支持Lite模式，所以这里的ProjectType是枚举值
 * 现在各种adaptor都支持了Lite模式，因此这里修改为string类型
 * 也可以使用空串表示未知类型，IDE自2.1.0可以自定对本地项目做类型推断
 * 由于类型被导出过，因此这里保留类型
 */
export enum ProjectType {
  DINGTALK_PERSONAL = 'dingtalk-personal', // 第三方个人应用
  DINTALK_BIZ_ISV = 'dingtalk-biz-isv', // 第三方企业应用
  DINGTALK_BIZ = 'dingtalk-biz', // 企业内部应用
  DINGTALK_BIZ_CUSTOM = 'dingtalk-biz-custom', // 企业定制应用
  DINGTALK_BIZ_WORKTAB_PLUGIN = 'dingtalk-biz-worktab-plugin' // 工作台组件
}

/**
 * IDE启动时与连接相关的参数
 */
export interface IDELaunchArgsForConnection {
  nodeIpcPath?: string;
  webSocketAddress?: string;
  connectionType: 'nodeIpc' | 'webSocket';
}

/**
 * 面向用户端，用户通过driver启动IDE时可供填写的参数
 */

export interface IDELaunchOptions {
  windowMode: IDEWindowMode;
  projectUri: string;
  projectType: ProjectType;
  // 使用vol-driver连接IDE的渠道名
  volDriverChannelName: string;
  // 对于插件项目，必须传入插件小程序的appId
  appId?: string;
  disablePublish?: boolean;
  // 禁止切换到完整模式
  forceLite?: boolean;
  // 远程开发模式，适用于CloudIDE等场景
  remoteDev?: boolean;
}

/**
 * 面向vol-driver自身，IDE启动vol-driver内部的一些控制参数
 */
export interface IDELaunchControlArgs {
  volDriverLaunchMode: IDELaunchMode;
  // 通信时使用的token
  volDriverToken?: string;
  volDriverRemoteSupportedMethods: string[];
}

/**
 * 面向IDE端，通过命令行等方式唤起IDE时传入的argv
 * 注意在parser时要写明parser类型，否则yargs会将空字符串parse为true
 */
export interface IDELaunchArgs
  extends IDELaunchArgsForConnection,
    IDELaunchOptions,
    IDELaunchControlArgs {}

export type IDELauncher = (ideLaunchArgs: IDELaunchArgs) => Promise<void>;



type IDELauncherCreatorOptions = {
  isDebug?: boolean;
};

/**
 * 基础款IDE启动器，只负责启动IDE到指定项目，不提供连接功能
 */
type IDESimpleLauncher = (
  simpleIDELaunchArgs: IDELaunchOptions,
) => Promise<void>;

/**
 * 使用yargsUnparser将参数反序列化，返回值是以空格分隔的数组
 */
const unParserIDELaunchArgs = (args: unknown): string[] =>
  yargsUnParser(args);

/**
 * 根据ide安装路径，创建一个通过shell启动IDE的launcher，不负责IDE的构建托管
 */
export const createIdeShellSimpleLauncher = (
  binPath: string,
  options: IDELauncherCreatorOptions = {
    isDebug: false,
  },
): IDESimpleLauncher => async (
  simpleIDELaunchArgs: IDELaunchOptions,
): Promise<void> => {
  const launchArgs = {
    ...simpleIDELaunchArgs,
    volDriverLaunchMode: 'launchOnly',
  };

  logger.debug('ide launch args', launchArgs);

  const launchProcess = spawn(
    binPath,
    // 为了避免参数被electron处理，应当使用--分割
    [
      '--',
      ...unParserIDELaunchArgs(launchArgs),
    ],
    {
      // 保证IDE不受终端关闭影响
      detached: true,
      // 非Debug时忽略IDE的输出
      stdio: ['inherit', options.isDebug ? 'inherit' : 'ignore', options.isDebug ? 'inherit' : 'ignore'],
      shell: isWindows,
    },
  );
  launchProcess.unref();
};



/**
 * 编解码url参数
 *
 * 编码需要考虑的情况：
 * - true false能够正确编码
 * - undefined不要编码为undefined字符串
 *
 * 解码需要考虑的情况：
 * - 正确处理布尔值、数值
 */

export const getParamsFromUrl = <T>(
  url: string,
  options: {
    string?: string[];
    boolean?: string[];
    number?: string[];
    array?: string[];
  } = {
    string: [],
    boolean: [],
    number: [],
    array: [],
  },
): T =>
  // @ts-ignore
  [...new URL(url).searchParams.entries()].reduce((acc, [key, value]) => {
    if (options.boolean?.includes(key)) {
      // 咋算一个布尔值呢？按javascript习惯吧……
      acc[key] = !!value;
    } else if (options.number?.includes(key)) {
      acc[key] = Number(value);
    } else if (options.array?.includes(key)) {
      if (!acc[key]) {
        acc[key] = [];
      }
      (acc[key] as string[]).push(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>) as T;

export const encodeParamsForUrl = <
  T extends Record<
    string,
    // TODO: 要是数组里面再有布尔或者数值该怎么办……
    number | string | boolean | undefined | null | string[]
  >
>(
    args: T,
    options: {
    string?: string[];
    boolean?: string[];
    number?: string[];
    array?: string[];
  } = {
      string: [],
      boolean: [],
      number: [],
      array: [],
    },
  ): string => {
  const params = Object.entries(args)
    .map(([key, value]) => {
      if (options.array?.includes(key)) {
        return (value as string[])
          .map(item => `${key}=${encodeURIComponent(item)}`)
          .join('&');
      }
      let ev = value;
      // 布尔值需要特殊处理为空，否则false也会被判断为true…
      if (options.boolean?.includes(key)) {
        ev = value ? true : '';
      }
      // undefined一律编码为空
      if (value === undefined) {
        ev = '';
      }
      return `${key}=${encodeURIComponent(ev as string)}`;
    })
    .join('&');
  return params;
};

export const createIDELaunchUrl = (args: IDELaunchArgs): string =>
  `antdevtool-tiny://external-launch?${encodeParamsForUrl(
    args as any,
    IDELaunchArgsType,
  )}`;

export const parseIDELaunchUrl = (url: string): IDELaunchArgs =>
  getParamsFromUrl<IDELaunchArgs>(url, IDELaunchArgsType);

export interface ProjectUriInfo {
  // 项目名，用于标题栏展示
  projectName: string;
  // 虚拟workspace在本地的映射路径
  workspacePath: string;
}

export interface RemoteDevProjectUriParams {
  workspaceId: string;
  projectName: string;
}

export const parseRemoteDevProjectUri = (uri: string): ProjectUriInfo => {
  const { scheme, } = URI.parse(uri);
  const {
    workspaceId,
    projectName,
  } = getParamsFromUrl<RemoteDevProjectUriParams>(uri);
  return {
    projectName,
    workspacePath: `${scheme}/${workspaceId}`,
  };
};

/**
  * 判断版是否符合mini对IDE的版本要求
  */
const isVersionMatched = (version: string) => semver.valid(version)
   && semver.satisfies(version, `>=${MIN_IDE_VERSION_REQUIRED}`);
 
/**
  * 获取本地已安装的IDE的版本号，返回为空表示本地未安装
  * 极端情况如果本地获取到的版本为空，因为无法用于版本判断，视为未安装
  */
const getLocalInstalledIdeVersion = (installRoot: string): string => {
  const pkgJsonPath = path.join(
    installRoot,
    '小程序开发者工具.app/Contents/Resources/app/package.json',
  );
  if (fs.existsSync(pkgJsonPath)) {
    const packageJsonObj = getJson(pkgJsonPath);
    const version = packageJsonObj && packageJsonObj.version;
    logger.debug('获取到的IDE版本：', version);
    return version;
  }
  return '';
};
 
/**
  * 获取本地已下载的IDE版本与路径信息
  */
const getLocalDownloadedIdeInfo = (): {
   path: string;
   version: string;
 } => {
  if (fs.existsSync(localConfigPath)) {
    const config = getJson(localConfigPath) as IGlobalRc;
    logger.debug('获取localConfig成功：', config);
    if (fs.existsSync(config.localDownloadedIdePath)) {
      return {
        path: config.localDownloadedIdePath,
        version: config.localDownloadedIdeVersion,
      };
    }
  }
  return {
    path: '',
    version: '',
  };
};
 
/**
  * 更新localConfig
  */
const updateLocalConfig = (config: Partial<IGlobalRc>): void => {
  let localConfig: Partial<IGlobalRc> = {};
  if (fs.existsSync(localConfigPath)) {
    localConfig = getJson(localConfigPath, true, {}) as Partial<IGlobalRc>;
  }
  setGlobalRc({
    ...localConfig,
    ...config,
  });
};
 
/**
  * 从线上拉取符合版本要求的IDE下载地址
  */
export const fetchMatchIdeVersionConfig = async (): Promise<VersionInfo> => {
  try {
    const res = await urllib.request(IDE_VERSIONS_CONFIG_URL, {
      dataType: 'json',
    });
    /**
      * 从结果中按照compatVersion字段筛选符合mini要求的IDE版本信息
      */
    return (res.data as DownloadConfig).versions.filter(item => item.compatVersion === MIN_IDE_VERSION_REQUIRED)[0];
  } catch (e) {
    logger.log('获取线上IDE版本信息失败：', e);
    throw e;
  }
};
 
/**
  * 挂载dmg镜像，并返回挂载后的地址
  * 按照文档，同一个镜像可以被多次attach
  * attach will return information about an already-attached image as if it had attached it
  */
const attachDmg = (dmgPath: string): string => {
  const result = execSync(`hdiutil attach ${dmgPath}`).toString();
  // 如果镜像挂载失败的话，输出为：hdiutil: attach failed - 无此文件或目录
  logger.debug('挂载镜像结果：', result);
  // 挂载结果的最后一项为挂载点
  const mountPath = result
    .split('\t')
    .pop()
    .trim();
  return mountPath;
};
 
/**
  * 下载IDE，并更新在localConfigPath中的记录
  */
const downloadIDE = async (): Promise<string> => {
  try {
    const versionInfo = await fetchMatchIdeVersionConfig();
    const bar = new ProgressBar('Downloading [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 30,
      total: 100,
    });
    // 先下载到临时文件夹，再移动到Downloads目录，避免用户看到一堆临时文件（包括中断下载后临时文件不会自动删除）
    const ideDownloadTmpDir = path.join(
      os.tmpdir(),
      `mini-ide-download-${Date.now()}`,
    );
    await mkdirp(ideDownloadTmpDir);
    // TODO: 暂时不考虑对windows的支持
    const ideDownloadName = `MiniProgramStudio-${versionInfo.version}.dmg`;
    const ideDownloadTmpPath = path.join(ideDownloadTmpDir, ideDownloadName);
    const dl = new EasyDl(versionInfo.macUrl, ideDownloadTmpPath, {
      connections: 10,
      maxRetry: 5,
    });
    let previousPercentage = 0;
    // 先tick一下让进度条出来
    bar.tick(0);
    await dl
      .on('progress', ({ total, }) => {
        // total里面给的percentage表示当前百分比，bar的tick需要的参数为进度条的增量
        // 因此手动计算一下
        const p = Math.floor(total.percentage);
        bar.tick(p - previousPercentage);
        previousPercentage = p;
      })
      .wait();
    let ideDownloadPath = path.join(
      os.homedir(),
      'Downloads',
      ideDownloadName,
    );
    // 如果默认名称已存在，就加个后缀，避免冲突
    // 最终解决方法应该是使用md5
    if (fs.existsSync(ideDownloadPath)) {
      ideDownloadPath = path.join(
        os.homedir(),
        'Downloads',
        `MiniProgramStudio-${versionInfo.version}-downloadByMini.dmg`,
      );
    }
    fs.renameSync(ideDownloadTmpPath, ideDownloadPath);

    updateLocalConfig({
      localDownloadedIdePath: ideDownloadPath,
      localDownloadedIdeVersion: versionInfo.version,
    });
    return ideDownloadPath;
  } catch (err) {
    logger.log('IDE下载失败：', err);
    throw err;
  }
};
 
/**
  * 获取IDE安装根目录或代下载IDE，流程图如下：
  *
  * 《本地版本符合？》-------N------->《已下载版本符合？》-------N------->【下载IDE】
  *       |                               |                             |
  *       |                               |                             |
  *       |                               |                             |
  *       Y                               Y                             |
  *       |                               |                             |
  *       |                               |                             |
  *       v                               v                             |
  *  【 启动IDE 】<-------------------【 挂载镜像 】<----------------------┛
  */
export const getOrDownloadIDE = async (): Promise<string> => {
  logger.debug('所需IDE版本：', MIN_IDE_VERSION_REQUIRED);
  const localInstalledIdeVersion = getLocalInstalledIdeVersion(
    MacDefaultInstallRoot,
  );
  if (isVersionMatched(localInstalledIdeVersion)) {
    logger.log(`本地已安装IDE：v${localInstalledIdeVersion}`);
    return MacDefaultInstallRoot;
  }
  const localDownloadedIdeInfo = getLocalDownloadedIdeInfo();
  if (localDownloadedIdeInfo.path) {
    if (isVersionMatched(localDownloadedIdeInfo.version)) {
      logger.log(`本地已存在 IDE 安装包：${localDownloadedIdeInfo.path}`);
      return attachDmg(localDownloadedIdeInfo.path);
    }
    logger.log(
      `本地IDE版本过低（v${localDownloadedIdeInfo.version}），正在下载最新版…`,
    );
  } else if (!localInstalledIdeVersion) {
    logger.log('本地未安装IDE，正在下载最新版 ...');
  } else {
    logger.log(
      `本地IDE版本过低（v${localInstalledIdeVersion}），正在下载最新版 ...`,
    );
  }
  const ideDownloadPath = await downloadIDE();
  logger.log(`IDE 已下载到：${ideDownloadPath}`);
  return attachDmg(ideDownloadPath);
};
 
