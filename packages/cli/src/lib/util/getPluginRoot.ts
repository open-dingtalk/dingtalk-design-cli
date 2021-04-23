import * as path from 'path';
import * as fs from 'fs';
import { error, } from '../cli-shared-utils/lib/logger';

export default () => {
  const cwd = path.resolve('./');
  const miniProjectJsonPath = path.join(cwd, 'mini.project.json');
  const pluginJsonPath = path.join(cwd, 'plugin.json');
  const hasPluginJsonPath = fs.existsSync(pluginJsonPath);
  const hasMiniProjectJson = fs.existsSync(miniProjectJsonPath);
  
  if (hasMiniProjectJson) {
    let miniProjectJsonStr = '';
    try {
      miniProjectJsonStr = fs.readFileSync(miniProjectJsonPath, {
        encoding: 'utf-8',
      });
    } catch(e) {
      console.log(e);
      error(`mini.project.json read fail. ${e.message}`);
      return '';
    }
    
    let miniProjectJson = {
      pluginRoot: '',
      compileType: '',
    };
    try {
      miniProjectJson = JSON.parse(miniProjectJsonStr);
    } catch(e) {
      console.log(e);
      error(`mini.project.json parse fail. ${e.message}`);
      return '';
    }
    
    if (miniProjectJson.compileType !== 'plugin') {
      error('mini.project.json中compileType非plugin');
      return '';
    } else if (!miniProjectJson.pluginRoot) {
      error('mini.project.json中没有填写pluginRoot');
      return '';
    }

    return path.join(cwd, miniProjectJson.pluginRoot);
  } else if (hasPluginJsonPath) {
    return cwd;
  } else {
    error('当前工作目录非插件工作目录');
    return '';
  }
};