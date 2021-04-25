import { debug, } from '../cli-shared-utils/lib/logger';
import rimraf from 'rimraf';

export default async (path: string) => {
  try {
    await new Promise((res, rej) => {
      rimraf(path, (err) => {
        if (err) {
          rej(err);
        } else {
          res(null);
        }
      });
    });
    debug('builder tar cleaned.');
  } catch(e) {
    debug(`builder tar cleaned fail. ${e.message}`);
  }
};