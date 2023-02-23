"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function () {return m[k];} };
  }
  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function (o, v) {
  o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const config_1 = require("../common/config");
const DEFAULT_STORE_PATH = config_1.RC_PATH;
class Store {
  constructor(opts) {
    this.storePath = opts && opts.storePath || DEFAULT_STORE_PATH;
    try {
      const config = JSON.parse(fs.readFileSync(this.storePath, {
        encoding: 'utf-8'
      }));
      this.config = config;
    }
    catch (e) {
      this.config = {};
    }
  }
  set(key, val) {
    // @ts-expect-error
    this.config[key] = val;
    fs.writeFile(this.storePath, JSON.stringify(this.config), { encoding: 'utf-8' }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  setAll(cf) {
    this.config = cf;
    fs.writeFile(this.storePath, JSON.stringify(this.config), { encoding: 'utf-8' }, (err) => {
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
  }
}
exports.default = Store;