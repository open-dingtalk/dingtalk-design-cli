import path from 'path';

import { findAppConfig, getPluginRefs, getEnableTabBar, IAppConfig, } from '../../src/config/appConfig';
import { findProjectConfig, } from '../../src/config/projectConfig';


test('findAppConfig', () => {
  const entry = path.join(__dirname, '../examples/miniapp-use-plugin');
  const projectConfig = findProjectConfig(entry);
  const appConfig = findAppConfig(entry, projectConfig);

  expect(appConfig.plugins.myPlugin.version).toBe('*');
  expect(appConfig.window.defaultTitle).toBe('My App');
});

test('getEnableTabBar', () => {
  let appConfig: IAppConfig;

  appConfig = {
    pages: [
      'pages/index/index',
      'pages/b/b'
    ],
    tabBar: {
      items: [
        {
          pagePath: 'pages/index/index',
          name: '首页',
        }
      ],
    },
  };

  expect(getEnableTabBar(appConfig)).toBe('YES');

  appConfig = {
    pages: [
      'pages/index/index',
      'pages/b/b'
    ],
    tabBar: {
      items: [
        {
          pagePath: 'pages/b/b',
          name: '首页',
        }
      ],
    },
  };

  expect(getEnableTabBar(appConfig)).toBe('NO');

  appConfig = {
    pages: [
      'pages/index/index',
      'pages/b/b'
    ],
  };

  expect(getEnableTabBar(appConfig)).toBe('NO');
});

test('getPluginRefs', () => {
  let appConfig: IAppConfig;

  appConfig = {
    pages: [],
    plugins: {
      myPlugin: {
        provider: 'testid',
        version: 'testversion',
      },
    },
  };

  expect(() => getPluginRefs(appConfig)).toThrowError();

  appConfig = {
    pages: [],
    plugins: {
      myPlugin: {
        provider: 'testid',
        version: 'dev',
      },
    },
  };

  expect(getPluginRefs(appConfig).length).toBe(0);

  appConfig = {
    pages: [],
    plugins: {
      myPlugin: {
        provider: 'testid',
        version: '*',
      },
    },
  };

  expect(getPluginRefs(appConfig).length).toBe(1);

  appConfig = {
    pages: [],
    plugins: {
      myPlugin: {
        provider: 'testid',
        version: '',
      },
    },
  };

  expect(() => getPluginRefs(appConfig)).toThrowError();

  appConfig = {
    pages: [],
    plugins: {
      myPlugin: {
        provider: '',
        version: '*',
      },
    },
  };

  expect(() => getPluginRefs(appConfig)).toThrowError();
});