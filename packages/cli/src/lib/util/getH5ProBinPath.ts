import config from '../common/config';
import * as os from 'os';
import download from 'download';
import { error, info, done, } from '../cli-shared-utils/lib/logger';
import * as fs from 'fs';
import * as path from 'path';
import tar from 'tar';
import mkdirp from 'mkdirp';
import { getGlobalRc, setGlobalRc, } from './globalRc';

export default async (): Promise<string> => {
  const platform = os.platform();
  const h5ProConfig = config.h5pro;
  const platformConfigs = h5ProConfig.platforms;
  const h5ProCurPlatformConfig  = platformConfigs[platform as keyof typeof platformConfigs];
  const supportPlatform = Object.keys(h5ProConfig.platforms);
  if (supportPlatform.indexOf(platform) === -1) {
    return '';
  }

  const globalRc = getGlobalRc();
  if (globalRc && globalRc.h5ProExecPath) {
    return globalRc.h5ProExecPath;
  }

  const binDownloadPath = h5ProCurPlatformConfig.binDownloadUrl;
  const tarStorePath = os.tmpdir();

  try {
    info('builder start download...');
    await download(binDownloadPath, tarStorePath);
    done('builder download success');
  } catch(e) {
    console.error(e);
    error(`builder download fail. ${e.message}`);
    return '';
  }

  try {
    info('builder start extracting...');
    const basename = path.basename(binDownloadPath);
    await tarExtract(path.join(tarStorePath, basename), h5ProConfig.storeDir);
    done('builder extract success');
  } catch(e) {
    console.error(e);
    error(`builder unzip fail. ${e.message}`);
    return '';
  }

  const binExecPath = path.join(h5ProConfig.storeDir, h5ProCurPlatformConfig.binExtractPath);
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