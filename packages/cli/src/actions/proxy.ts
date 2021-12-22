import { ICommandContext, IPcPluginDevOpts, } from '../lib/common/types';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import * as path from 'path';
import * as fs from 'fs';
import getH5ProBinPath from '../lib/util/getH5ProBinPath';
import { spawn, } from 'child_process';
import EventEmitter from 'events';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';
import stripAnsi from 'strip-ansi';
import { isWindows, } from '../lib/cli-shared-utils';
import server from 'http-server';
import proxy from './proxy/index';
const monitor = getMonitor(config.yuyanId);

/**
 * 小程序与普通工作台组件 - 本地构建、上传debug包、生成预览二维码
 */
export default async (commandContext: ICommandContext) => {
  const {
    dtdConfig,
    cwd,
    miniProgramConfigContent,
    miniProgramConfigPath,
  } = commandContext;

  const {
    corpId,
    miniAppId,
  } = dtdConfig;
  // cwd为项目根目录
  if (!miniProgramConfigContent) {
    logger.error('当前目录下找不到mini.project.json，请在小程序或工作台组件工作目录下运行');
    return;
  }

  const pluginRoot = miniProgramConfigContent.pluginRoot;
  if (!pluginRoot) return;

  const binPath = await getH5ProBinPath();
  if (!binPath) {
    logger.error('找不到pc工作台组件构建器');
    return;
  }

  /** 
   * generate component.json 
   * h5pro 要求要有component.json，内容同plugin.json
   */
  try {
    fs.copyFileSync(path.resolve(pluginRoot, 'plugin.json'), path.resolve(pluginRoot, 'component.json'));
  } catch(e) {
    logger.error('生成component.json失败', e.message);
    monitor.logJSError(e);
    return;
  }

  const bundlePath = path.join(cwd, './dist');
  const event = new EventEmitter();
  
  /**
   * 启动服务器，来访问bundle
   */
  function startDevServer(bundlePath) {
    const port = '3001';
    server.createServer({
      root: bundlePath,
      cors:'true',
      cache: -1,
    }).listen(port);
    logger.info(`bundle构建成功，地址: http://localhost:${port}/index.js?pluginId=${miniAppId}`);
    // 本地代理线上地址
    proxy({ miniAppId });
  }

  /**
   * build
   * 使用 h5pro 本地构建代码
   * TODO: 封装成可复用的inspector
   */
  const buildCp = spawn(
    require.resolve(binPath),
    [
      'component',
      '--watch',
      '--input', pluginRoot,
      '--output', bundlePath,
      '--mini-project-json', miniProgramConfigPath,
      // h5pro太久了升级一下吧
      // '--isolated',
      '--jsonp',
      '$__dingtalkMini_manager.plugin.register',
      '--',
      '--color' // 解决chalk判断isTTY而过滤ansi的问题
    ],
    {
      stdio: 'pipe',
      cwd,
      env: process.env,
      shell: isWindows,
    }
  );
  let isInit = false;
  let firstBuildTimer: NodeJS.Timeout;

  buildCp.stdout.pipe(process.stdout);
  buildCp.stderr.pipe(process.stderr);
  buildCp.stdout.on('data', (chunk)=>{
    const msg = stripAnsi(chunk.toString());
    if (msg.indexOf('Built at:') !== -1 && !isInit) {
      logger.info('Starting the development server');
      firstBuildTimer = setTimeout(()=>{
        event.emit('first-build-success');
      }, 500);
      isInit = true;
    } else if(msg.indexOf('ERROR in') !== -1) {
      logger.error('bundle本地构建失败', msg);
      clearTimeout(firstBuildTimer);
      buildCp.kill();
      monitor.logJSError(new Error(msg));
    }
  });

  buildCp.on('error', (err) => {
    logger.error('bundle本地构建失败', err.message);
    clearTimeout(firstBuildTimer);
    buildCp.kill();
    monitor.logJSError(err);
  });

  /**
   * start dev server
   * 本地启动装载可运行工作台组件的基座
   */
  event.on('first-build-success', startDevServer.bind(null, bundlePath, miniAppId));
};

