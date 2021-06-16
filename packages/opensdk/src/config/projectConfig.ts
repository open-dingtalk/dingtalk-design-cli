import path from 'path';
import fs from 'fs-extra';
import { ECompileType, } from '../types';

export interface IProjectConfig {
  miniprogramRoot?: string;
  pluginRoot?: string;
  compileType?: ECompileType;
}

export function findProjectConfig(entry: string) {
  const file = path.join(entry, 'mini.project.json');

  if (!fs.existsSync(file)) {
    return {
      miniprogramRoot: './',
      compileType: ECompileType.MiniProgram,
    };
  }

  return fs.readJSONSync(file) as IProjectConfig;
}