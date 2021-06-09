import * as path from 'path';
import getH5ProBinPath from '../src/lib/util/getH5ProBinPath';
import config from '../src/lib/common/config';
import * as os from 'os';
import { setGlobalRcItem, getGlobalRc, setGlobalRc, } from '../src/lib/util/globalRc';
import getJson from '../src/lib/util/getJson';
import { IGlobalRc, } from '../src/lib/common/types';

describe('Utils', ()=>{
  const cwd = path.join(__dirname);
  console.log('cwd', cwd);

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
    const key = 'testKey' as keyof IGlobalRc;
    const value = 'testValue';
    setGlobalRcItem(key, value);

    // check setGlobalRcItem
    const globalRc1 = getGlobalRc();
    expect(globalRc1).not.toBe(null);
    if (globalRc1) {
      expect(globalRc1[key]).toBe(value);
    }

    // reset
    setGlobalRcItem(key, '');

    // check setGlobalRc
    setGlobalRc({
      ...globalRc1,
      [key]: value,
    });
    const globalRc2 = getGlobalRc();
    expect(globalRc2).not.toBe(null);
    if (globalRc2) {
      expect(globalRc2[key]).toBe(value);
    }
  });

  test('getJson', () => {
    {
      // 文件不存在，容错
      const content = getJson('', true);
      expect(content).toEqual({});
    }

    {
      // 文件不存在，容错且包含默认值
      const defaultJson = {
        test: '',
      };
      const content = getJson('', true, defaultJson);
      expect(content).toEqual(defaultJson);
    }

    {
      // 文件不存在，不容错
      let content;
      try {
        content = getJson('', false);
      } catch(e) {
      } finally {
        expect(content).toEqual(undefined);
      }
    }

    {
      // 文件存在
      const filepath = path.join(cwd, './mock/mp1/dtd.config.json');
      const content = getJson(filepath);
      console.log(content);
      expect(content).not.toEqual({});
    }
    
  });
});