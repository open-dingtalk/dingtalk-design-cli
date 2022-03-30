import { spawn, } from 'child_process';
import { isWindows, } from '../lib/cli-shared-utils';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { choosePort, } from '../lib/cli-shared-utils/lib/network';
import config from '../lib/common/config';
import server from 'http-server';
import * as http from 'http';

const monitor = getMonitor(config.yuyanId);

interface IOpts {
  /** 调试的目标H5页面地址 */
  targetH5Url?: string;
  /** 鉴权代理服务地址 */
  proxyServerUrl?: string;
  /** 鉴权代理服务脚本地址 */
  proxyServerScript?: string;
  /** 模拟器核心依赖存放目录 */
  assetDir?: string;
  /** 模拟器框架存放目录 */
  frameworkDir?: string;
  /** 是否需要自动打开浏览器 */
  needOpen?: boolean;
}

interface IResponse {
  /** 模拟器核心依赖挂载服务 */
  assetServer: http.Server;
  /** 模拟器框架挂载服务 */
  frameworkServer: http.Server;
  /** 生成的本地模拟器地址 */
  webSimulatorUrl: string;
  /** 调试的目标H5页面地址 */
  targetH5Url: string;
}

const DEFAULT_HOST = '0.0.0.0';

export default async (opts: IOpts): Promise<IResponse | null | undefined> => {
  const {
    assetDir,
    frameworkDir,
  } = opts;

  /**
   * 挂载目标h5
   */
  let targetH5Port = config.webSimulator.targetH5Port;
  let targetH5Url = '';

  if (opts.targetH5Url) {
    targetH5Url = opts.targetH5Url;
  } else {
    try {
      targetH5Port = await choosePort(DEFAULT_HOST, targetH5Port);
      targetH5Url = `http://127.0.0.1:${targetH5Port}`;
    } catch(e) {
      logger.error('H5页面启动失败', e);
      monitor.logJSError(e);
      return;
    }
    const cp = spawn(
      'npm',
      [
        'run',
        'start',
      ],
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          BROWSER: 'none', // react项目，配置了这个才不会自动打开浏览器
          PORT: String(targetH5Port),
        },
        shell: isWindows,
      }
    );
    cp.on('error', (err) => {
      logger.error('h5项目启动失败', err);
      monitor.logJSError(err);
    });
  }

  /**
   * lyraBase静态资源挂载
   */
  let assetsPort = config.webSimulator.assetsPort;
  try {
    assetsPort = await choosePort(DEFAULT_HOST, assetsPort);
  } catch(e) {
    logger.error('模拟器静态资源启动失败', e);
    monitor.logJSError(e);
    return;
  }
  const assetServer = server.createServer({
    root: assetDir,
    cors: true,
    cache: -1,
  });
  assetServer.listen(assetsPort);

  /**
   * 模拟器框架挂载
   */
  let frameworkPort = config.webSimulator.frameworkPort;
  try {
    frameworkPort = await choosePort(DEFAULT_HOST, frameworkPort);
  } catch(e) {
    logger.error('模拟器框架启动失败', e);
    monitor.logJSError(e);
    return;
  }
  // 挂载web模拟器框架
  const frameworkServer = server.createServer({
    root: frameworkDir,
    cors: true,
    cache: -1,
  });
  frameworkServer.listen(frameworkPort);

  /**
   * 模拟器本地代理服务挂载
   */
  let proxyServerUrl = '';
  if (opts.proxyServerUrl) {
    proxyServerUrl = opts.proxyServerUrl;
  } else {
    let proxyServerPort = config.webSimulator.proxyServerPort;
    try {
      proxyServerPort = await choosePort(DEFAULT_HOST, proxyServerPort);
    } catch(e) {
      logger.error('模拟器本地服务器代理启动失败', e);
      monitor.logJSError(e);
      return;
    }

    if (!opts.proxyServerScript) {
      logger.error('模拟器本地服务器代理启动失败，请配置模拟器本地服务器代理服务脚本地址');
      return;
    }
  
    // 启动本地代理服务器
    const proxyServerScript = opts.proxyServerScript;
    const proxyServerCp = spawn(
      'node',
      [
        proxyServerScript,
      ],
      {
        stdio: 'ignore',
        env: {
          ...process.env,
          PORT: String(proxyServerPort),
        },
        shell: isWindows,
      }
    );
    proxyServerCp.on('error', (err) => {
      logger.error('本地代理服务器启动失败', err);
      monitor.logJSError(err);
    });
    proxyServerUrl = `http://127.0.0.1:${proxyServerPort}`;
  }
  
  const url = `http://127.0.0.1:${frameworkPort}/${config.webSimulator.webSimulatorFrameworkHtmlName}?lyraBaseUrl=http://127.0.0.1:${assetsPort}&targetH5Url=${targetH5Url}/&proxyServerUrl=${proxyServerUrl}`;
  logger.success('模拟器启动在: ', url);
  
  return {
    assetServer,
    frameworkServer,
    webSimulatorUrl: url,
    targetH5Url,
  };
};