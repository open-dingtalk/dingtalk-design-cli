import { ICommandContext, } from '../lib/common/types';
import * as path from 'path';
import * as fs from 'fs';
import getMonitor from '../lib/cli-shared-utils/lib/monitor/framework-monitor';
import config from '../lib/common/config';
import template from '../lib/common/template';
import getJson from '../lib/util/getJson';

const monitor = getMonitor(config.yuyanId);

/**
 * 在本地快速创建一个组件
 * 
 * 1. ${pluginRoot}/components目录下新增组件模版
 * 2. 在miniprogram/pages/index/index.json中插入组件引用
 * 3. 在miniprogram/pages/index/index.axml中插入组件axml
 * 4. 在ding.config.json中增加mock配置
 */
export default async (commandContext: ICommandContext, args: any[]) => {
  const {
    miniProgramConfigContent,
    dtdConfig,
    logger,
    cwd,
  } = commandContext;
  const pluginRoot = miniProgramConfigContent.pluginRoot;

  if (!pluginRoot) {
    logger.error('找不到pluginRoot，请检查mini.project.json中是否配置了pluginRoot');
    return;
  }

  const miniprogramRoot = miniProgramConfigContent.miniprogramRoot;
  const isTypescript = dtdConfig.typescript;
  const pluginComponentsPath = path.join(cwd, pluginRoot, 'components');
  const appJsonPath = path.join(cwd, miniprogramRoot, 'app.json');
  const miniprogramAppJson = getJson(appJsonPath, true, {});
  const componentDirName = args[0];
  
  /** 1. ${pluginRoot}/components目录下新增组件模版 */
  const componentDirPath = path.join(pluginComponentsPath, componentDirName);
  try {
    fs.mkdirSync(componentDirPath);
  } catch(e) {
    logger.error('创建组件目录失败', e);
    monitor.logJSError(e);
    return;
  }
  try {
    const opts: fs.WriteFileOptions = {
      encoding: 'utf-8',
    };
    fs.writeFileSync(path.join(componentDirPath, 'index.axml'), template.pluginComponent.axml, opts);
    fs.writeFileSync(path.join(componentDirPath, 'index.acss'), template.pluginComponent.acss, opts);
    fs.writeFileSync(path.join(componentDirPath, 'index.json'), template.pluginComponent.indexJson, opts);
    fs.writeFileSync(path.join(componentDirPath, 'config.json'), template.pluginComponent.configJson, opts);
    if (isTypescript) {
      fs.writeFileSync(path.join(componentDirPath, 'index.ts'), template.pluginComponent.ts, opts);
    } else {
      fs.writeFileSync(path.join(componentDirPath, 'index.js'), template.pluginComponent.js, opts);
    }
  } catch(e) {
    logger.error(`往组件目录 ${componentDirPath} 写入文件失败`, e);
    monitor.logJSError(e);
    return;
  }

  /** 2. 在miniprogram/pages/index/index.json中插入组件引用 */
  const firstPage = miniprogramAppJson.pages && miniprogramAppJson.pages[0];
  if (!firstPage) {
    logger.error(`找不到小程序页面配置信息，请检查${appJsonPath}是否正确配置字段 pages`);
    return;
  }
  const firstPathAbs = path.join(cwd, miniprogramRoot, );
  
};