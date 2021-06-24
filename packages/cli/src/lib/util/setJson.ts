import getJson from './getJson';
import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';

export function setJsonItem (path: string, key: string, value: any): boolean {
  try {
    const content = getJson(path, false);
    content[key] = value;
    fs.writeFileSync(path, JSON.stringify(content, null, '\t'), {
      encoding: 'utf-8',
    });
    return true;
  } catch(e) {
    logger.debug('setJsonItem fail', e);
    return false;
  }
}

export default (path: string, value: any) => {
  try {
    fs.writeFileSync(path, JSON.stringify(value, null, '\t'), {
      encoding: 'utf-8',
    });
    return true;
  } catch(e) {
    logger.debug('setJson fail', e);
    return false;
  }
};