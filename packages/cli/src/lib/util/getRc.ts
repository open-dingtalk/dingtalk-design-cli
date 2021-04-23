import * as fs from 'fs';
import { error, } from '../cli-shared-utils/lib/logger';

export default (path: string) => {
  let res = null;

  if (!fs.existsSync(path)) {
    return res;
  }

  try {
    const rcStr = fs.readFileSync(path, {
      encoding: 'utf-8',
    });
    res = JSON.parse(rcStr);
  } catch(e) {
    console.error(e);
    error(`get rc fail. ${e.message}`);
    res = null;
  }

  return res;
};