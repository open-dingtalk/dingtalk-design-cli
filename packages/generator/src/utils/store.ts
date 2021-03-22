import * as fs from 'fs';
import { RC_PATH, } from '@common/config';

export interface Options {
  // 存储地址
  storePath?: string;
}

export interface Config {
  // 上一次检查的时间，保证一天最多检查一次，13位时间戳
  lastUpdateCheck: number;
  // 上一次检查拉回来的最新latest版本
  latestVersion: string;
}

const DEFAULT_STORE_PATH = RC_PATH;

export default class Store {
  storePath: string;
  config: Config;

  constructor(opts?: Options) {
    this.storePath = opts && opts.storePath || DEFAULT_STORE_PATH;
      
    try {
      const config = JSON.parse(fs.readFileSync(this.storePath, {
        encoding: 'utf-8',
      })) as Config;
      this.config = config;
    } catch(e) {
      this.config = {} as Config;
    }
  }

  set(key: keyof Config, val: Config[keyof Config]): void {
    // @ts-expect-error
    this.config[key] = val;
    fs.writeFile(this.storePath, JSON.stringify(this.config), { encoding: 'utf-8', }, (err)=>{
      if(err) {
        console.error(err);
      }
    });
  }
  
  setAll(cf: Config): void {
    this.config = cf;
    fs.writeFile(this.storePath, JSON.stringify(this.config), { encoding: 'utf-8', }, (err)=>{
      if(err) {
        console.error(err);
      }
    });
  }

  get(key: keyof Config): Config[keyof Config] {
    return this.config[key];
  }

  getAll(): Config {
    return this.config;
  }
  
}