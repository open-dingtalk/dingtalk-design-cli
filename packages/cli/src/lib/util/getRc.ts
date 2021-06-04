import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';
import getJson from './getJson';

export default (path: string) => {
  try {
    const rc = getJson(path, false);
    return rc;
  } catch(e) {
    logger.error('get rc fail', e);
    return null;
  }
};