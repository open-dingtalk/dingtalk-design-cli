import * as path from 'path';
import * as execa from 'execa';
import getH5ProBinPath from '../dist/lib/util/getH5ProBinPath';
import config from '../dist/lib/common/config';
import * as os from 'os';
import { setGlobalRc, getGlobalRc, } from '../dist/lib/util/globalRc';

describe('Utils', ()=>{
  test('getH5ProBinPath', async () => {
    const platform = os.platform();
    const h5ProConfig = config.h5pro;
    const platformConfigs = h5ProConfig.platforms;
    const h5ProCurPlatformConfig  = platformConfigs[platform as keyof typeof platformConfigs];
    const supportPlatform = Object.keys(h5ProConfig.platforms);

    console.log(platform, supportPlatform);
    
    const binExecPath = await getH5ProBinPath();

    if (binExecPath) {
      expect(binExecPath).toBe(path.join(h5ProConfig.binStoreDir, h5ProCurPlatformConfig.binExtractPath));
    }
  }, 60 * 1000);

  test('globalRc', () => {
    const key = 'testKey';
    const value = 'testValue';
    setGlobalRc(key, value);

    const globalRc = getGlobalRc();
    expect(globalRc).not.toBe(null);
    if (globalRc) {
      expect(globalRc[key]).toBe(value);
    }

    setGlobalRc(key, '');
  });
});