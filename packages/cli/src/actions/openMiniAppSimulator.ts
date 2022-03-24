import { logger, } from '../lib/cli-shared-utils/lib/logger';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { choosePort, } from '../lib/cli-shared-utils/lib/network';
import config from '../lib/common/config';
import server from 'http-server';
import getSimulatorProxyServer from './simulatorProxyServer';
import getSimulatorFrameworkStoreDir from '../lib/util/getSimulatorFrameworkStoreDir';
import { v4, } from 'uuid';
import express from 'express';
import replaceUuid from '../lib/util/replaceUuid';
import writePortFile from '../lib/util/writePortFile';
import getMt2Config from '../lib/util/getMt2Config';
import _get from 'lodash/get';

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

  const {
    proxyServerScript,
  } = opts;
  const { 
    project,
    simulatorPort,
    assetsPort,
  } = config.miniAppWebSimulator;

  /**
   * 模拟器本地代理服务挂载
   */
  const {
    proxyServerUrl,
    proxyServerPort,
  }  = await getSimulatorProxyServer({
    proxyServerScript,
  });

  // 挂载port
  let assetsFinalPort;
  try {
    assetsFinalPort = await choosePort(DEFAULT_HOST, assetsPort);
  } catch(e) {
    logger.error('assetsPort choose fail', e);
    monitor.logJSError(e);
    return;
  }

  // write port file
  writePortFile(proxyServerPort);
  logger.success('port file written');
  const app = express();
  app.listen(assetsFinalPort);
  app.use('/', express.static(__dirname));

  // 启动minidev
  const { minidev, } = require('@ali/minidev-rc');

  let webSimulatorUrl;
  const devServerBuild = await minidev.dev({
    project,
    port: simulatorPort,
    parallel: true,
    sourceMap: true,
    hmr: false,
    minify: false,
  });

  // get extend url from mt2 config
  const mt2Config = await getMt2Config();

  await new Promise((res) => {
    devServerBuild.devServer.once('done', async () => {
      // devServer 构建完成后启动 模拟器
      const { separated, } = await minidev.devWebSimulator({
        autoOpen: false,
        lyraParams: {
          rendererExtend: [
            'https://g.alicdn.com/dingtalk-developer-about/superagent_cdn/0.0.1/superagent.min.js',
            _get(mt2Config, 'frameworkConfig.extend'),
            `http://localhost:${assetsFinalPort}/port.js`,
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
  
      webSimulatorUrl = `http://127.0.0.1:${frameworkPort}/${config.miniAppWebSimulator.webSimulatorFrameworkHtmlName}?simulator=${encodeURIComponent(simulator)}&devtool=${encodeURIComponent(devtool)}&proxyServerUrl=${encodeURIComponent(proxyServerUrl)}`;
      res('');
    });
  });

  return {
    webSimulatorUrl,
  };
};
