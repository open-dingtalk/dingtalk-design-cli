"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const config_1 = require("../common/config");
const DEFAULT_STORE_PATH = config_1.rcPath;
class Store {
    constructor(opts) {
        this.storePath = opts && opts.storePath || DEFAULT_STORE_PATH;
        try {
            const config = JSON.parse(fs.readFileSync(this.storePath, {
                encoding: 'utf-8' }));

            this.config = config;
        }
        catch (e) {
            this.config = {};
        }
    }
    set(key, val) {
        // @ts-expect-error
        this.config[key] = val;
        fs.writeFile(this.storePath, JSON.stringify(this.config), { encoding: 'utf-8' }, err => {
            if (err) {
                console.error(err);
            }
        });
    }
    setAll(cf) {
        this.config = cf;
        fs.writeFile(this.storePath, JSON.stringify(this.config), { encoding: 'utf-8' }, err => {
            if (err) {
                console.error(err);
            }
        });
    }
    get(key) {
        return this.config[key];
    }
    getAll() {
        return this.config;
    }}

exports.default = Store;