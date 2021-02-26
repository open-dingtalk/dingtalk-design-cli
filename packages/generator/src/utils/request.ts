/* eslint-disable */
import {Options} from 'request';
export default {
  get (uri: string, opts: Partial<Options>) {
    // lazy require
    const util = require('util');
    const request = util.promisify(require('request'));
    const reqOpts = {
      method: 'GET',
      timeout: 30000,
      resolveWithFullResponse: true,
      json: true,
      uri,
      ...opts
    };
  
    return request(reqOpts);
  }
};