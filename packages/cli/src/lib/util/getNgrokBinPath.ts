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
  const ngrokConfig = config.ngrok;
  const platformConfigs = ngrokConfig.platforms;
  const ngrokCurPlatformConfig  = platformConfigs[platform as keyof typeof platformConfigs];
  const supportPlatform = Object.keys(ngrokConfig.platforms);
  if (supportPlatform.indexOf(platform) === -1) {
    logger.error('当前平台不支持运行钉钉内网穿透工具，支持的平台', supportPlatform);
    return '';
  }

  const globalRc = getGlobalRc();
  if (globalRc && globalRc.ngrokExecPath) {
    return globalRc.ngrokExecPath;
  }

  const binDownloadPath = ngrokCurPlatformConfig.binDownloadUrl;
  const tarStorePath = os.tmpdir();

  /** builder download */
  try {
    logWithSpinner('本地没找到钉钉内网穿透工具，正在下载');
    await download(binDownloadPath, tarStorePath);
    successSpinner('钉钉内网穿透工具下载成功');
  } catch(e) {
    failSpinner('钉钉内网穿透工具下载失败');
    logger.error(e.message);
    return '';
  }

  /** builder extract */
  const basename = ngrokCurPlatformConfig.binBaseName || path.basename(binDownloadPath);
  const tar = path.join(tarStorePath, basename);
  try {
    logger.debug('正在提取钉钉内网穿透工具', tar);
    await tarExtract(tar, ngrokConfig.binStoreDir);
    logger.debug('钉钉内网穿透工具提取成功');
  } catch(e) {
    logger.debug('钉钉内网穿透工具提取失败', e);
    return '';
  } finally {
    await clean(tar);
  }

  /** set global builder bin path */
  const binExecPath = path.join(ngrokConfig.binStoreDir, ngrokCurPlatformConfig.binExtractPath);
  setGlobalRcItem('ngrokExecPath', binExecPath);
  return binExecPath;
};