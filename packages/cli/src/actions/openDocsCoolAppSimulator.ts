import { logger, } from '../lib/cli-shared-utils/lib/logger';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { exec } from 'child_process';
const waitUntil = require('wait-until');

interface IOpts {
  // 用于调试的钉钉文档地址
  documentUrl: string;
  port?: string;
}
interface IResponse {
  // 生成的调试地址
  url: string;
}

export default (opts: IOpts): Promise<IResponse | null | undefined> => {
  logger.debug('docs cool app debug start');

  const { documentUrl, port } = opts;

  // 确认manifest文件存在
  const manifestPath = path.join(process.cwd(), 'devManifest.json');
  if (!fs.existsSync(manifestPath)) {
    logger.error('找不到devManifest.json文件，请先配置devManifest');
  }

  const rawData = fs.readFileSync(manifestPath);
  const manifest = JSON.parse(rawData as any as string);

  // check if port occupied
  isPortOccupy(port ?? '3000', (occupy) => {
    if (occupy) {
      logger.error(`本地端口${port ?? '3000'} 当前被占用，请清理当前端口运行的进程或切换其他端口进行调试`);
    }
  })

  // start dev server
  let execBefore: string = '';
  execBefore = port ? execBefore + `PORT=${port}` : execBefore;
  exec(`${execBefore} node scripts/start.js`, (error, stdout, stderr) => {
    logger.log(stdout);
    logger.error(stderr);
    if (error) {
      logger.error(error);
    }
  });

  return new Promise((resolve) => {
    waitUntil()
    .interval(2000)
    .times(1500)
    .condition((cb: (condition: boolean) => void) => {
      isPortOccupy(port ?? '3000', cb);
    })
    .done(() => {
      // open document
      if (documentUrl) {
        const url = documentUrlCheck(documentUrl);
        if (url) {
          logger.info(`正在打开 ${documentUrl}`);
          const initUrl = initDocumentUrl('devManifest.json', manifest.dev!.id, url, port);
          logger.info(`如果没有自动打开文档，请手动在浏览器中打开链接： ${initUrl}`);
          resolve({ url: initUrl });
        }
      }
      resolve(null);
    });
  });
}

const parsePort = (text: string) => {
  const result = text.match(/:(\d+)$/);
  return result ? parseInt(result[1], 10) : undefined;
}

const isPortOccupy = (port: string, callback: (condition: boolean) => void): void => {
  const isWin32 = process.platform === "win32";
  const isLinux = process.platform === "linux";
  const command = isWin32 ? `netstat -ano` : isLinux ? `netstat -tlpna | grep :${port}` : `lsof -n -i:${port}`;

  exec(command, (error, stdout) => {
    if (error) {
      if (error.code === 1) {
        // no processes are using the port
        callback(false);
      }
    } else {
      const processIds = new Set<number>();
      const lines = stdout.trim().split("\n");

      if (isWin32) {
        lines.forEach((line) => {
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          const [protocol, localAddress, foreignAddress, status, processId] = line.split(" ").filter((text) => text);
          if (processId !== undefined) {
            const localAddressPort = parsePort(localAddress);
            if (localAddressPort && localAddressPort === parseInt(port)) {
              processIds.add(parseInt(processId, 10));
            }
          }
        });
      } else if (isLinux) {
        lines.forEach((line) => {
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          const [proto, recv, send, local_address, remote_address, state, program] = line
            .split(" ")
            .filter((text) => text);
          if (local_address !== undefined && local_address.endsWith(`:${port}`) && program !== undefined) {
            const pid = parseInt(program, 10);
            if (!isNaN(pid)) {
              processIds.add(pid);
            }
          }
        });
      } else {
        lines.forEach((line) => {
          /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
          const [process, processId, user, fd, type, device, size, node, name] = line
            .split(" ")
            .filter((text) => text);
          if (processId !== undefined && processId !== "PID" && process === 'node') {
            processIds.add(parseInt(processId, 10));
          }
        });
      }
      callback(Array.from(processIds).length !== 0);
    }
  })
}

const documentUrlCheck = (documentUrl: string) => {
  let url: URL | undefined;
  try {
    url = new URL(documentUrl);
  } catch (e) {
    logger.error('文档地址不合法');
    return;
  }
  if (documentUrl.includes('alidocs.dingtalk.com/spreadsheetv2/')) {
    logger.error(`当前文档地址不支持调试文档酷用，请访问 https://alidocs.dingtalk.com/i/ 并复制对应文档地址。`);
    return;
  }
  return url;
}

const initDocumentUrl = (manifestFile: string, id: string, url: URL, port?: string): string => {
  const addonInfo = `${port ?? '3000'}\|${manifestFile}\|${id}`;
  url.searchParams.set('devcoolapp', addonInfo);
  return url.href.replace('|', '%7C');
}
