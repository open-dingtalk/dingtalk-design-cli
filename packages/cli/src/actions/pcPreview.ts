import { ICommandContext, IPcPluginDevOpts, } from '../lib/common/types';
import { logger, } from '../lib/cli-shared-utils/lib/logger';
import * as path from 'path';
import * as fs from 'fs';
import { get, } from 'lodash';
import getH5ProBinPath from '../lib/util/getH5ProBinPath';
import { spawn, } from 'child_process';
import EventEmitter from 'events';
import clean from '../lib/util/clean';
import urlencode from 'urlencode';
import open from 'open';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';
import stripAnsi from 'strip-ansi';

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
    pcPreviewOptions,
  } = dtdConfig;
  
  if (!miniProgramConfigContent) {
    logger.error('当前目录下找不到mini.project.json，请在小程序或工作台组件工作目录下运行');
    return;
  }

  const pluginRoot = miniProgramConfigContent.pluginRoot;
  if (!pluginRoot) return;

  const pcPluginDevOpts: IPcPluginDevOpts = {
    corpId: corpId || '',
    mode: get(pcPreviewOptions, 'mode', 'light'),
  };

  const mockPreviewEnvironmentPath = path.join(__dirname, '../../h5bundle');
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

  const bundlePath = path.join(__dirname, '../../h5bundle/src/bundle');
  const event = new EventEmitter();
  
  /**
   * 启动mock基座来运行工作台组件
   * @param mockPreviewEnvironmentPath 
   * @param pcPluginDevOpts 
   */
  async function startDevServer(mockPreviewEnvironmentPath: string, pcPluginDevOpts: IPcPluginDevOpts) {
    const miniprogramPath = path.resolve('./', 'miniprogram');
    const symbollink2miniprogram = path.join(__dirname, '../../h5bundle/src/miniprogram');
  
    if (fs.existsSync(symbollink2miniprogram)) {
      await clean(symbollink2miniprogram);
    }
    
    try {
      fs.symlinkSync(miniprogramPath, symbollink2miniprogram);
    } catch(e) {
      logger.warn('mock start fail', e.message);
    }
  
    logger.debug(`pc工作台组件预览，将在${mockPreviewEnvironmentPath}路径下启动create-react-app项目来运行mock基座，预览时的配置信息`, pcPluginDevOpts);
  
    const cp = spawn(
      'npm',
      [
        'run',
        'start',
        '--',
        '--color' // 解决chalk判断isTTY而过滤ansi的问题
      ],
      {
        stdio: 'pipe',
        cwd: mockPreviewEnvironmentPath,
        env: process.env,
      }
    );
  
    cp.stdout.pipe(process.stdout);
    cp.stdout.on('data', (chunk)=>{
      const msg = chunk.toString();
      if (msg.indexOf('Starting the development server') !== -1) {
        const {
          corpId,
          mode,
        } = pcPluginDevOpts;
  
        open(`dingtalk://dingtalkclient/page/link?url=${urlencode(`http://127.0.0.1:12345?corpId=${corpId}&mode=${mode}&ddtab=true`)}`);
      } else if (msg.indexOf('Something is already running on port') !== -1) {
        logger.error('端口12345被占用');
      }
    });
  
    cp.on('error', (err)=>{
      logger.error('pc工作台组件 dev server启动失败', err.message);
      monitor.logJSError(err);
    });
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
      '--',
      '--color' // 解决chalk判断isTTY而过滤ansi的问题
    ],
    {
      stdio: 'pipe',
      cwd,
      env: process.env,
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
      logger.error('pc工作台组件本地构建失败', msg);
      clearTimeout(firstBuildTimer);
      buildCp.kill();
      monitor.logJSError(new Error(msg));
    }
  });

  buildCp.on('error', (err) => {
    logger.error('pc工作台组件本地构建失败', err.message);
    clearTimeout(firstBuildTimer);
    buildCp.kill();
    monitor.logJSError(err);
  });

  /**
   * start dev server
   * 本地启动装载可运行工作台组件的基座
   */
  event.on('first-build-success', startDevServer.bind(null, mockPreviewEnvironmentPath, pcPluginDevOpts));
};

