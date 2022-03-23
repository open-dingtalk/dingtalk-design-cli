import AnyProxy from 'anyproxy';
import { execSync, } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';
import proxyHttp from './proxy';
const { green, } = chalk;
import { IProxyParams, } from '../../lib/common/types';

/**
 * 代理本地代码
 * @param argv
 */
async function proxy({ miniAppId, cwd, }: IProxyParams): Promise<void> {
  const spinner = ora('本地代理中...');
  spinner.start();

  // 检测证书是否存在
  if (!AnyProxy.utils.certMgr.ifRootCAFileExists()) {
    AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
      // let users to trust this CA before using proxy
      if (!error) {
        const certDir = require('path').dirname(keyPath);
        // eslint-disable-next-line no-console
        console.log('The cert is generated at', certDir);
        const isWin = /^win/.test(process.platform);
        if (isWin) {
          execSync('start .', { cwd: certDir, });
        } else {
          execSync('open .', { cwd: certDir, });
        }
      } else {
        console.error('error when generating rootCA', error);
      }
    });
    spinner.stop();
    return;
  }
  proxyHttp({ miniAppId, cwd, });
  spinner.succeed(`${green('本地代理成功')}\n${green('手机端代理地址:' + getIPAdress() + ':8001')}`);
}

// 获取本机电脑IP
function getIPAdress() {
  const interfaces = require('os').networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        // console.log(alias.address);
        return alias.address;
      }
    }
  }
}
export default proxy;
