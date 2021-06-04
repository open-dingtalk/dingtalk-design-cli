import config from '../common/config';
import * as os from 'os';
import download from 'download';
import { logger, } from '../cli-shared-utils/lib/logger';
import * as fs from 'fs';
import * as path from 'path';
import tar from 'tar';
import mkdirp from 'mkdirp';
import { getGlobalRc, setGlobalRc, } from './globalRc';
import clean from './clean';

export default async (): Promise<string> => {
  const platform = os.platform();
  const h5ProConfig = config.h5pro;
  const platformConfigs = h5ProConfig.platforms;
  const h5ProCurPlatformConfig  = platformConfigs[platform as keyof typeof platformConfigs];
  const supportPlatform = Object.keys(h5ProConfig.platforms);
  if (supportPlatform.indexOf(platform) === -1) {
    logger.error('当前平台不支持h5pro');
    return '';
  }

  const globalRc = getGlobalRc();
  if (globalRc && globalRc.h5ProExecPath) {
    return globalRc.h5ProExecPath;
  }

  const binDownloadPath = h5ProCurPlatformConfig.binDownloadUrl;
  const tarStorePath = os.tmpdir();

  /** builder download */
  try {
    logger.info('builder start download...');
    await download(binDownloadPath, tarStorePath);
    logger.success('builder download success');
  } catch(e) {
    logger.error('builder download fail', e);
    return '';
  }

  /** builder extract */
  const basename = path.basename(binDownloadPath);
  const tar = path.join(tarStorePath, basename);
  try {
    logger.info('builder start extracting...');
    await tarExtract(tar, h5ProConfig.binStoreDir);
    logger.success('builder extract success');
  } catch(e) {
    logger.error('builder unzip fail', e);
    return '';
  } finally {
    await clean(tar);
  }

  /** set global builder bin path */
  const binExecPath = path.join(h5ProConfig.binStoreDir, h5ProCurPlatformConfig.binExtractPath);
  setGlobalRc('h5ProExecPath', binExecPath);
  return binExecPath;
};

async function tarExtract(source: string, dest: string) {
  await mkdirp(dest);
  await tar.x({
    file: source,
    C: dest,
  });
}