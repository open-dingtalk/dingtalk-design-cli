"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    get(uri, opts) {
        // lazy require
        const util = require('util');
        const request = util.promisify(require('request'));
        const reqOpts = Object.assign({ method: 'GET', timeout: 30000, resolveWithFullResponse: true, json: true, uri }, opts);
        return request(reqOpts);
    },
};
