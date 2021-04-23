import config from '../common/config';
import * as fs from 'fs';
import { error, } from '../cli-shared-utils/lib/logger';
import { IGlobalRc, } from '../common/types';
import getRc from './getRc';

export const getGlobalRc = (): null | IGlobalRc => {
  return getRc(config.rcPath);
};

export const setGlobalRc = (k: keyof IGlobalRc, v: any): void => {
  let rc = getGlobalRc();
  if (!rc) {
    rc = {
      h5ProExecPath: '',
    };
  }
  rc[k] = v;

  const rcStr = JSON.stringify(rc);
  try {
    fs.writeFileSync(config.rcPath, rcStr, {
      encoding: 'utf-8',
    });
  } catch(e) {
    console.error(e);
    error(`set global rc fail. ${e.message}`);
  }
};