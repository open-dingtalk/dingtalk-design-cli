/**
 * 云端获取模拟器框架页面，并存储到本地
 * 如果获取失败，则默认取 tpl/webSimulator.html作为模拟器框架页面
 */

import config from '../common/config';
import { failSpinner, logWithSpinner, successSpinner, } from '../cli-shared-utils/lib/spinner';
import download from 'download';
import { logger, } from '../cli-shared-utils/lib/logger';
import path from 'path';

import getMt2Config from './getMt2Config';
import getMonitor from '../cli-shared-utils/lib/monitor/framework-monitor';

const monitor = getMonitor(config.yuyanId);

export default async (isMiniApp?: boolean): Promise<string> => {
  const DEFAULT_SIMULATOR_FRAMEWORK_DIR = path.join(__dirname, '../../../tpl');

  const configType = isMiniApp ? 'miniAppWebSimulator' : 'webSimulator';
  /** get mt2Config */
  const mt2Config = await getMt2Config();

  if (!mt2Config) return DEFAULT_SIMULATOR_FRAMEWORK_DIR;

  /** simulator framework download */
  const htmlPath = isMiniApp ? mt2Config.frameworkConfig.miniAppHtml : mt2Config.frameworkConfig.h5Html;
  const frameworkDir = config[configType].webSimulatorFrameworkStoreDir;

  try {
    logWithSpinner('检查模拟器框架版本...');
    await download(htmlPath, frameworkDir, {
      filename: config[configType].webSimulatorFrameworkHtmlName,
    });
    successSpinner('模拟器框架更新成功');
    return frameworkDir;
  } catch(e) {
    failSpinner('模拟器框架更新失败');
    logger.error(e.message);
    monitor.logJSError(e);
    return '';
  }
};