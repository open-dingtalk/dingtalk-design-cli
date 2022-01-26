// 本地代理
// anyproxy --intercept --rule proxy.js
import AnyProxy, { ProxyOptions, } from 'anyproxy';
import { IProxyParams, } from '../../lib/common/types';
import rule from './rule';
function closeProxy() {
  AnyProxy.utils.systemProxyMgr.disableGlobalProxy('https');
}
export default function({ miniAppId, cwd, }: IProxyParams): void {
  // 系统全局代理
  AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '8001', 'https');

  const options: ProxyOptions = {
    port: 8001,
    rule: rule({ miniAppId, cwd, }),
    webInterface: {
      enable: true,
      webPort: 8002,
    },
    throttle: 10000,
    forceProxyHttps: true,
    wsIntercept: false, // 不开启websocket代理
    silent: true,
    dangerouslyIgnoreUnauthorized: true,
  };
  const proxyServer = new AnyProxy.ProxyServer(options);

  proxyServer.on('ready', () => { /* */ });
  proxyServer.on('error', () => { 
    closeProxy();
  });
  proxyServer.start();

  process.on('exit', () => {
    try {
      closeProxy();
      proxyServer && proxyServer.close();
    } catch (e) { 
      console.error(e);
    }
    process.exit();
  });

  //exit cause ctrl+c
  process.on('SIGINT', () => {
    try {
      closeProxy();
      proxyServer && proxyServer.close();
    } catch (e) {
      console.error(e);
    }
    process.exit();
  });

  process.on('uncaughtException', () => {
    try {
      closeProxy();
      proxyServer && proxyServer.close();
    } catch (e) { 
      console.error(e);
    }
    process.exit();
  });

}

