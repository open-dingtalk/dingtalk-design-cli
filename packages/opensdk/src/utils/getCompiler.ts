import { MiniProgramCompiler, ConsoleLogger, } from 'minicode-compile-bundled';
import { spawn, } from 'child_process';
import { join, } from 'path';
import { existsSync, } from 'fs';
import download, { downloadPath, name, } from './downloadTinyCli';

async function getCompiler() {
  const compilerPath = join(downloadPath, name);
  if (!existsSync(compilerPath)) {
    // console.log('没有找到本地编译工具，请先运行 "miniu compiler download"');
    console.log('没有找到本地编译工具，开始下载');
    await download();

    // if (!existsSync(compilerPath)) {
    //   console.log('下载失败，请稍后重试');
    //   return;
    // }
  }

  return new MiniProgramCompiler({
    logger: new ConsoleLogger(),
    addMinifishProxy: false,
    debugUtilsPath: require.resolve('builder-debug-utils'),
    delegateOptions: {
      tiny: {
        createProcess: (type: string, argv: string[], options: any) => {
          if (!options.env) {
            options.env = {};
          }
          options.env.BUILD_PKG_ENGINE = 'tiny';
          options.env.NODE_OPTIONS = undefined;
          options.stdio = ['pipe', 'pipe', 'pipe', 'ipc'];
          return spawn(compilerPath, [type, ...argv], options);
        },
      },
      ng: {
        createProcess: (argv: string[], options: any) => {
          if (!options.env) {
            options.env = {};
          }
          options.env.BUILD_PKG_ENGINE = 'cube';
          options.env.NODE_OPTIONS = undefined;
          options.stdio = ['pipe', 'pipe', 'pipe', 'ipc'];
          return spawn(compilerPath, argv, options);
        },
      },
    },
  });
}

export { getCompiler, MiniProgramCompiler };