import config from '../common/config';
import * as os from 'os';
import download from 'download';
import { logger, } from '../cli-shared-utils/lib/logger';
import * as path from 'path';
import { getGlobalRc, setGlobalRcItem, } from './globalRc';
import clean from './clean';
import { failSpinner, logWithSpinner, successSpinner, } from '../cli-shared-utils/lib/spinner';
import tarExtract from './tarExtract';

export default async (): Promise<string> => {
  const platform = os.platform();
  const h5ProConfig = config.h5pro;
  const platformConfigs = h5ProConfig.platforms;
  const h5ProCurPlatformConfig  = platformConfigs[platform as keyof typeof platformConfigs];
  const supportPlatform = Object.keys(h5ProConfig.platforms);
  if (supportPlatform.indexOf(platform) === -1) {
    logger.error('当前平台不支持编译pc工作台组件，支持的平台', supportPlatform);
    return '';
  }

  const globalRc = getGlobalRc();
  if (globalRc && globalRc.h5ProExecPath) {
    return globalRc.h5ProExecPath;
  }

  const binDownloadPath = h5ProCurPlatformConfig.binDownloadUrl;
  const tarStorePath = os.tmpdir();
  /** builder extract */
  const basename = path.basename(binDownloadPath);
  const tar = path.join(tarStorePath, basename);

  /** builder download */
 
  try {
    logWithSpinner('本地没找到pc工作台组件构建器，正在下载');
    await download(binDownloadPath, tar);
    successSpinner('pc工作台组件构建器下载成功');
  } catch(e) {
    failSpinner('pc工作台组件构建器下载失败');
    logger.error(e.message);
    return '';
  }

  try {
    logger.debug('正在提取h5pro bin文件');
    await tarExtract(path.join(tar, h5ProCurPlatformConfig.binName), h5ProConfig.binStoreDir);
    logger.debug('h5pro bin 提取成功');
  } catch(e) {
    logger.debug('h5pro bin 提取失败', e);
    return '';
  } finally {
    await clean(tar);
  }

  /** set global builder bin path */
  const binExecPath = path.join(h5ProConfig.binStoreDir, h5ProCurPlatformConfig.binExtractPath);
  setGlobalRcItem('h5ProExecPath', binExecPath);
  return binExecPath;
};