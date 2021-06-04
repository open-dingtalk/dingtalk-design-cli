import fs from 'fs-extra';
import path from 'path';

import { IPlugin, } from '../openapi';
import { IProjectConfig, } from './projectConfig';

export interface ITabBarItem {
  pagePath: string;
  name: string;
  icon?: string;
  activeIcon?: string;
}

export interface ITabBarConfig {
  textColor?: string;
  selectedColor?: string;
  backgroundColor?: string;
  items: Array<ITabBarItem>;
}

export interface IWindowConfig {
  defaultTitle?: string;
  backgroundColor?: string;
  titleBarColor?: string;
  pullPrefresh?: boolean;
  allowsBounceVertical?: 'YES' | 'NO',
  supportColorScheme?: Array<'light' | 'dark'>;
}

export interface IAppConfig {
  pages: string[];
  window?: IWindowConfig;
  tabBar?: ITabBarConfig;
  plugins?: {
    [key: string]: { 
      provider: string; 
      version: string;
    }
  }
}

export function findAppConfig(entry: string, projectConfig: IProjectConfig) {
  const miniprogramRoot = projectConfig.miniprogramRoot || '.';
  const file = path.join(entry, miniprogramRoot, 'app.json');

  fs.accessSync(file);

  return fs.readJSONSync(file) as IAppConfig;
}

export function getEnableTabBar(appConfig: IAppConfig) {
  const mainPage = getMainPage(appConfig);
  const tabBarItems = appConfig.tabBar?.items;

  if (!tabBarItems || tabBarItems.length === 0) {
    return 'NO';
  }

  return mainPage === tabBarItems[0].pagePath ? 'YES' : 'NO';
}

export function getMainPage(appConfig: IAppConfig) {
  return appConfig.pages[0];
}

export function getPluginRefs(appConfig: IAppConfig) {
  if (!appConfig.plugins) {
    return [];
  }

  const pluginNames = Object.keys(appConfig.plugins);

  if (pluginNames.length === 0) {
    return [];
  }

  const pluginRefs = new Map<string, IPlugin>();

  for(const n of pluginNames) {
    const v = appConfig.plugins[n];
    const id = v.provider;
    const version = v.version;

    if (!id || !version) {
      throw new Error(`非法的静态插件配置plugins.${n}：${JSON.stringify(v)}`);
    }

    // 小程序插件的开发配置，忽略掉
    if (version === 'dev') {
      continue;
    }

    if (version !== '*') {
      throw new Error(`非法的插件配置plugins.${n}：静态插件版本进支持通配符*`);
    }

    pluginRefs.set(id, { plugin_id: id, plugin_version: version, pluign_version: version, });
  }

  return Array.from(pluginRefs.values());
}