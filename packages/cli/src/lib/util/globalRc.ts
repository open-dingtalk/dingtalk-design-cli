import config from '../common/config';
import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';
import { IGlobalRc, } from '../common/types';
import getRc from './getRc';

export const getGlobalRc = (): null | IGlobalRc => {
  return getRc(config.globalRc) as null | IGlobalRc;
};

export const setGlobalRcItem = (k: keyof IGlobalRc, v: any): void => {
  let rc = getGlobalRc();
  if (!rc) {
    rc = {
      h5ProExecPath: '',
    };
  }
  rc[k] = v;

  const rcStr = JSON.stringify(rc);
  try {
    fs.writeFileSync(config.globalRc, rcStr, {
      encoding: 'utf-8',
    });
  } catch(e) {
    logger.error('set global rc fail', e);
  }
};

export const setGlobalRc = (opts: IGlobalRc): void => {
  const rcStr = JSON.stringify(opts);
  try {
    fs.writeFileSync(config.globalRc, rcStr, {
      encoding: 'utf-8',
    });
  } catch(e) {
    logger.error('set global rc fail', e);
  }
};