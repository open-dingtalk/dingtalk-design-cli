import * as path from 'path';
import * as fs from 'fs';
import { error, } from '../cli-shared-utils/lib/logger';
import getMiniProjectJson from './getMiniProjectJson';

export default () => {
  const cwd = path.resolve('./');
  const pluginJsonPath = path.join(cwd, 'plugin.json');
  const hasPluginJsonPath = fs.existsSync(pluginJsonPath);
  const miniProjectJson = getMiniProjectJson();

  if (miniProjectJson) {
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