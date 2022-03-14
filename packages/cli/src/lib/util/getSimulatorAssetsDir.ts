import ProgressBar from 'progress';
import EasyDl from 'easydl';
import path from 'path';
import mkdirp from 'mkdirp';
import config from '../common/config';
import os from 'os';
import * as fs from 'fs';
import { setGlobalRc, getGlobalRc, } from './globalRc';
import { logger, } from '../cli-shared-utils/lib/logger';
import { failSpinner, logWithSpinner, successSpinner, } from '../cli-shared-utils/lib/spinner';
import download from 'download';
import clean from './clean';
import tarExtract from './tarExtract';

/**
  * 下载模拟器资源
  */
export default async (): Promise<string> => {
  const globalRc = getGlobalRc();
  if (globalRc && globalRc.localWebSimulatorAssetsDir) {
    return globalRc.localWebSimulatorAssetsDir;
  }

  /** tar download */
  try {
    logWithSpinner('本地没找到模拟器资源，正在下载');
    await download(config.webSimulator.tarUrl, config.webSimulator.storeDir);
    successSpinner('模拟器资源下载成功');
  } catch(e) {
    failSpinner('模拟器资源下载失败');
    logger.error(e.message);
    return '';
  }

  /** tar extract */
  const basename = path.basename(config.webSimulator.tarUrl);
  const tar = path.join(config.webSimulator.storeDir, basename);
  try {
    logger.debug('正在解压模拟器资源');
    await tarExtract(tar, config.webSimulator.storeDir);
    logger.debug('模拟器资源解压成功');
  } catch(e) {
    logger.debug('模拟器资源解压失败', e);
    return '';
  } finally {
    await clean(tar);
  }
  
  /** set global path */
  setGlobalRc({
    localWebSimulatorAssetsDir: config.webSimulator.storeDir,
  });
  return config.webSimulator.storeDir;
};