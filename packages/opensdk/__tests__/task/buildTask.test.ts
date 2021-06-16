
import { sdk, } from '../../src/index';
import * as sdkConfig from '../sdk-test-config';
import path from 'path';

const cfg = sdkConfig.prod;

jest.setTimeout(60000);

describe('BuildTask', () => {

  beforeAll(() => {
    sdk.setConfig(cfg);
  });

  test('miniapp', async () => {
    const resultUrl = await sdk.miniUpload({
      project: path.resolve(__dirname, '../examples/miniapp-default'),
      miniAppId: cfg.miniAppId,
      // packageVersion: '0.0.11',
      onProgressUpdate: (info) => {
        console.log('xxx onProgressUpdate', info);
      },
    });

    console.log('xxx resultUrl', resultUrl);
  });

  test('miniapp-use-plugin', async () => {
    const resultUrl = await sdk.miniUpload({
      project: path.resolve(__dirname, '../examples/miniapp-use-plugin'),
      miniAppId: cfg.miniAppId,
      // packageVersion: '0.0.11',
      onProgressUpdate: (info) => {
        console.log('xxx onProgressUpdate', info);
      },
    });

    console.log('xxx resultUrl', resultUrl);
  });

  test('miniapp-use-subpackages', async () => {
    const resultUrl = await sdk.miniUpload({
      project: path.resolve(__dirname, '../examples/miniapp-use-subpackages'),
      miniAppId: cfg.miniAppId,
      // packageVersion: '0.0.11',
      onProgressUpdate: (info) => {
        console.log('xxx onProgressUpdate', info);
      },
    });

    console.log('xxx resultUrl', resultUrl);
  });
});