/**
 * Module dependencies
 */
import chokidar, { FSWatcher, } from 'chokidar';
import debounce from 'lodash.debounce';
import { logger, } from './logger';
 
export interface IWatcherOptions {
  cwd: string;
  files: string[];
}

export interface IWatcherWatchOptions {
  debounceDuration?: number;
}

export class Watcher {
   inited: boolean;
 
   watcher: FSWatcher;
 
   watchedFiles: Array<[string[], (filePath: string) => void]>;
 
   constructor(
     readonly opts: IWatcherOptions,
   ) {
     this.inited = false;
     this.watcher = null as unknown as FSWatcher;
     this.watchedFiles = [];
   }
 
   /**
    * 初始化
    *
    * @description 需要由调用方自行初始化
    */
   init(): void {
     if (this.inited) {
       return;
     }
     this.inited = true;
     this.watcher = chokidar.watch([this.opts.cwd, ...(this.opts.files || [])], {
       ignored: /(\/node_modules\/|\/.git\/)/,
       ignoreInitial: true,
     });
     this.watchedFiles = [];
     /**
      * TODO consider rest events.
      */
     this.watcher.on('change', (filePath: string) => {
       logger.debug('[watcher]', filePath, 'changed');
       for (const [files, callback] of this.watchedFiles) {
         if (files.includes(filePath)) {
           callback(filePath);
         }
       }
     });
   }
 
   /**
    * 监听
    *
    * @param {string[]} files
    * @param {(filePath: string) => void} callback
    */
   watch(files: string[], callback: (filePath: string) => void, options: IWatcherWatchOptions = {}): void {
     let cb = callback;
     if (options?.debounceDuration) {
       cb = debounce(cb, options.debounceDuration);
     }
     if (Array.isArray(files)) {
       this.watchedFiles.push([files, cb]);
     } else {
       throw new Error('`files` should be string array');
     }
   }
 
   /**
    * 关闭监听
    */
   close(): void {
     this.watcher.close();
   }
}
 