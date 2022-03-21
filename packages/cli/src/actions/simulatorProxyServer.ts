import { spawn, } from 'child_process';

import config from '../lib/common/config';
import { choosePort, } from '../lib/cli-shared-utils/lib/network';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import { isWindows, } from '../lib/cli-shared-utils';


const monitor = getMonitor(config.yuyanId);

interface IOpts {
	/** 鉴权代理服务地址 */
  proxyServerUrl?: string;
	/** 鉴权代理服务脚本地址 */
  proxyServerScript?: string;
}

interface IResponse {
  proxyServerUrl: string;
}

const DEFAULT_HOST = '0.0.0.0';

export default async (opts: IOpts): Promise<IResponse | null | undefined> => {
	
  let proxyServerUrl = '';
  if (opts.proxyServerUrl) {
    proxyServerUrl = opts.proxyServerUrl;
  } else {
    /**
		 * 模拟器本地代理服务挂载
		 */
    const proxyServerPort = config.miniAppWebSimulator.proxyServerPort;

    try {
      const detectProxyServerPort = await choosePort(DEFAULT_HOST, proxyServerPort);
      if (detectProxyServerPort !== proxyServerPort) {
        // 依赖的扩展extend.js中约定端口必须为8333
        const error = `端口${proxyServerPort}被其他服务占用，模拟器本地服务器代理启动失败`;
        logger.error(error);
        monitor.logJSError(new Error(error));
      }
    } catch(e) {
      logger.error('模拟器本地服务器代理启动失败', e);
      monitor.logJSError(e);
      return;
    }

    // 启动本地代理服务器
    if (!opts.proxyServerScript) {
      logger.error('模拟器本地服务器代理启动失败，请配置模拟器本地服务器代理服务脚本地址');
      return;
    }
    const proxyServerScript = opts.proxyServerScript;
    const appType = 'miniApp';
    const proxyServerCp = spawn(
      'node',
      [
        proxyServerScript,
        appType,
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

  return {
    proxyServerUrl,
  };
};
