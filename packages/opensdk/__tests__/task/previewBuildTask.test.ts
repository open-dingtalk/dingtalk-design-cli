import { sdk, } from '../../src/index';
import * as sdkConfig from '../sdk-test-config';
import path from 'path';
import qs from 'qs';

const cfg = sdkConfig.prod;

jest.setTimeout(60000);

describe('PreviewBuildTask', () => {

  beforeAll(() => {
    sdk.setConfig(cfg);
  });

  test('miniapp', async () => {
    const resultUrl = await sdk.previewBuild({
      project: path.resolve(__dirname, '../examples/miniapp-default'),
      miniAppId: cfg.miniAppId,
      page: 'pages/web-view/webview',
      query: 'a=2&b=2',
      corpId: 'testcorpid',
      onProgressUpdate: (info) => {
        console.log('xxx onProgressUpdate', info);
      },
    });

    console.log('xxx resultUrl', resultUrl);
  });

  test('miniapp-use-plugin', async () => {
    const resultUrl = await sdk.previewBuild({
      project: path.resolve(__dirname, '../examples/miniapp-use-plugin'),
      miniAppId: cfg.miniAppId,
      page: 'pages/index/index',
      query: 'a=2&b=2',
      // corpId: 'testcorpid',
      onProgressUpdate: (info) => {
        console.log('xxx onProgressUpdate', info);
      },
    });

    console.log('xxx resultUrl', resultUrl);
  });

  test('miniapp-use-subpackages', async () => {
    const resultUrl = await sdk.previewBuild({
      project: path.resolve(__dirname, '../examples/miniapp-use-subpackages'),
      miniAppId: cfg.miniAppId,
      page: 'pages/index/index',
      query: 'a=2&b=2',
      // corpId: 'testcorpid',
      onProgressUpdate: (info) => {
        console.log('xxx onProgressUpdate', info);
      },
    });

    console.log('xxx resultUrl', resultUrl);
  });

  // test.skip('plugin', async () => {
  //   const resultUrl = await sdk.previewBuild({
  //     project: path.resolve(__dirname, '../examples/plugin'),
  //     // TODO: 需要一个插件ID
  //     miniAppId: cfg.miniAppId,
  //     page: 'pages/index/index',
  //     query: "a=2&b=2",
  //     onProgressUpdate: (info) => {
  //       console.log('xxx onProgressUpdate', info);
  //     }
  //   });

  //   console.log('xxx resultUrl', resultUrl);
  // });
});