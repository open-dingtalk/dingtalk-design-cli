import * as path from 'path';
import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';

export default () => {
  const cwd = path.resolve('./');
  const miniProjectJsonPath = path.join(cwd, 'mini.project.json');
  const hasMiniProjectJson = fs.existsSync(miniProjectJsonPath);

  if (hasMiniProjectJson) {
    let miniProjectJsonStr = '';
    try {
      miniProjectJsonStr = fs.readFileSync(miniProjectJsonPath, {
        encoding: 'utf-8',
      });
    } catch(e) {
      logger.error('mini.project.json read fail', e);
      return null;
    }
    
    let miniProjectJson;
    try {
      miniProjectJson = JSON.parse(miniProjectJsonStr);
      return miniProjectJson;
    } catch(e) {
      logger.error('mini.project.json parse fail', e);
      return null;
    }
  } else {
    return null;
  }
};