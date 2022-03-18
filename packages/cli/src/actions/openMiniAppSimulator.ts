import { spawn, } from 'child_process';
import { isWindows, } from '../lib/cli-shared-utils';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { choosePort, } from '../lib/cli-shared-utils/lib/network';
import config from '../lib/common/config';
import server from 'http-server';
import path from 'path';
import * as http from 'http';
import getSimulatorProxyServer from './simulatorProxyServer';
import getSimulatorFrameworkStoreDir from '../lib/util/getSimulatorFrameworkStoreDir';
import { v4 } from 'uuid';
import replaceUuid from '../lib/util/replaceUuid';

interface IOpts {
  /** 鉴权代理服务脚本地址 */
  proxyServerScript?: string;
}

interface IResponse {
  /** 生成的本地模拟器地址 */
  webSimulatorUrl: string;
}

const DEFAULT_HOST = '0.0.0.0';
const monitor = getMonitor(config.yuyanId);

export default async (opts: IOpts): Promise<IResponse | null | undefined> => {
  logger.debug('mp simulator start');
  const { minidev, } = require('@ali/minidev-rc');

  const {
    proxyServerScript,
  } = opts;
  const { 
    extendPort,
    project,
    simulatorPort,
  } = config.miniAppWebSimulator;
  // 挂载lyra-dingtalk扩展
  const extendServer = server.createServer({
    root: './extend.js',
    cors: true,
    cache: -1,
  });
  extendServer.listen(extendPort);

  let webSimulatorUrl;
  console.log('config', config.miniAppWebSimulator);
  const devServerBuild = await minidev.dev({
    project,
    port: simulatorPort,
    parallel: true,
    sourceMap: true,
    hmr: false,
    minify: false,
  });

  await new Promise((res, rej) => {
    devServerBuild.devServer.once('done', async () => {
      // devServer 构建完成后启动 模拟器
      const { bundled, separated, } = await minidev.devWebSimulator({
        autoOpen: false,
        lyraParams: {
          rendererExtend: [
            'https://g.alicdn.com/dingtalk-developer-about/superagent_cdn/0.0.1/superagent.min.js',
            `http://127.0.0.1:${extendPort}/extend.js`,
          ],
        },
      }, devServerBuild);
      console.log('bundled', bundled);
    
      // bundled 中是 web 版本模拟器 & 调试器的地址, 一般来说打开这个地址运行
    
      // separated 中是分离的模拟器和调试器的地址，可以用于更复杂的场景进行集成
      // 注意：使用时请为每个会话将 url 中的 __uuid__ 替换成模拟器和调试器一致的 uuid。
      const uuid = v4();
      let simulator = replaceUuid(separated.simulator, uuid);
      const devtool = replaceUuid(separated.devtool, uuid);
      console.log('模拟器挂载完成，开始挂载框架')
      /**
       * 模拟器框架挂载
       */
      const frameworkDir = await getSimulatorFrameworkStoreDir(true);
      console.log('frameworkDir', frameworkDir);
      let frameworkPort = config.miniAppWebSimulator.frameworkPort;
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
      const { proxyServerUrl, }  = await getSimulatorProxyServer({
        proxyServerScript,
      });
      webSimulatorUrl = `http://127.0.0.1:${frameworkPort}/${config.miniAppWebSimulator.webSimulatorFrameworkHtmlName}?simulator=${encodeURIComponent(simulator)}&devtool=${encodeURIComponent(devtool)}&proxyServerUrl=${encodeURIComponent(proxyServerUrl)}`;
      console.log('devUrl:', webSimulatorUrl);
      res('');
    });
  })

  return {
    webSimulatorUrl,
  };
};
