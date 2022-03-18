import { logger, } from '../lib/cli-shared-utils/lib/logger';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { choosePort, } from '../lib/cli-shared-utils/lib/network';
import config from '../lib/common/config';
import server from 'http-server';
// import * as os from 'os';
// import * as path from 'path';
// import * as fs from 'fs';
import getSimulatorProxyServer from './simulatorProxyServer';
import getSimulatorFrameworkStoreDir from '../lib/util/getSimulatorFrameworkStoreDir';
import { v4, } from 'uuid';
import replaceUuid from '../lib/util/replaceUuid';
import express from 'express';

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

  const app = express();
  const {
    proxyServerScript,
  } = opts;
  const { 
    extendPort,
    project,
    simulatorPort,
  } = config.miniAppWebSimulator;
  app.listen(extendPort);
  app.use('/', express.static(__dirname));
  // 挂载lyra-dingtalk扩展
  // const extendServer = server.createServer({
  //   root: path.join(os.homedir(), '.extend'),
  //   cors: true,
  //   cache: -1,
  //   logFn: (req, res) => {
  //     fs.readFile('./extend.js', (err, data) => {
  //       if (err) {
  //         console.error(err);
  //       } else {
  //         res.end(data.toString());
  //       }
  //     });
  //   },
  // });
  // extendServer.listen(extendPort);

  let webSimulatorUrl;
  const devServerBuild = await minidev.dev({
    project,
    port: simulatorPort,
    parallel: true,
    sourceMap: true,
    hmr: false,
    minify: false,
  });

  await new Promise((res) => {
    devServerBuild.devServer.once('done', async () => {
      // devServer 构建完成后启动 模拟器
      const { separated, } = await minidev.devWebSimulator({
        autoOpen: false,
        lyraParams: {
          rendererExtend: [
            'https://g.alicdn.com/dingtalk-developer-about/superagent_cdn/0.0.1/superagent.min.js',
            `http://127.0.0.1:${extendPort}/extend.js`,
          ],
        },
      }, devServerBuild);
    
      // 为每个会话将 url 中的 __uuid__ 替换成模拟器和调试器一致的 uuid
      const uuid = v4();
      const simulator = replaceUuid(separated.simulator, uuid);
      const devtool = replaceUuid(separated.devtool, uuid);

      /**
       * 模拟器框架挂载
       */
      const frameworkDir = await getSimulatorFrameworkStoreDir(true);
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
      res('');
    });
  });

  return {
    webSimulatorUrl,
  };
};
