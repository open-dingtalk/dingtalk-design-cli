#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from 'chalk';
import config from '../lib/common/config';
import program from 'commander';
import checkNodeVersion from '../lib/util/checkNodeVersion';
import yeomanRuntime from 'yeoman-environment';
import leven from 'leven';
import { done as doneLog, debug, error, info, warn, } from '../lib/cli-shared-utils/lib/logger';
import * as path from 'path';
import checkCanPreview from '../lib/util/checkCanPreview';
import getPluginRoot from '../lib/util/getPluginRoot';
import { exec, execSync, } from 'child_process';
import open from 'open';
import urlencode from 'urlencode';
import getH5ProBinPath from '../lib/util/getH5ProBinPath';
import * as fs from 'fs';
import { logWithSpinner, stopSpinner, failSpinner, } from '../lib/cli-shared-utils/lib/spinner';
import EventEmitter from 'events';
import getRc from '../lib/util/getRc';
import getRcJson from '../lib/util/getRcJson';
import { get, } from 'lodash';
import { EAppType, IPcPluginDevOpts, IPluginRc, IWorkspaceRc, } from '../lib/common/types';
import clean from '../lib/util/clean';
import getMiniProjectJson from '../lib/util/getMiniProjectJson';
import checkCanUpload from '../lib/util/checkCanUpload';
import inquirer from 'inquirer';
import semver from 'semver';
import { sdk as opensdk, } from 'dingtalk-miniapp-opensdk';
import el from 'eslint';
import pluginEl from '@ali/dingtalk-worktab-plugin-script';
import rcJson from './mockRc';
import urllib from 'urllib';

const event = new EventEmitter();
const pkgJson = require('../../package.json');
const requiredVersion = pkgJson.engines.node;
const pkgName = pkgJson.name;
const pkgVersion = pkgJson.version;

checkNodeVersion(requiredVersion, pkgName);



program
  .version(`${pkgName} ${pkgVersion}`)
  .usage('<command> [arguments] [options]');

program
  .command('init')
  .option('-a, --appType [appType]', 'Skip prompts and use specified appType')
  .option('-t, --template [template]', 'Skip prompts and use specified template, default etc.')
  .option('-l, --language [language]', 'Skip prompts and use specified language, js, ts etc.')
  .option('--skip-install [skip-install]', 'Skip install the dependencies.')
  .arguments('[outDir]')
  .description('Create a new project', {
    outDir: 'Type where to create the project',
  })
  .action((outDir, options)=>{
    const env = yeomanRuntime.createEnv();
    const done = ()=>{
      doneLog('dd init done.');
    };
    // @ts-ignore
    env.lookup(function () {
      debug(JSON.stringify(env.getGeneratorsMeta()));
      env.run(`${config.generatorNamespace} ${outDir || ''}`, {
        appType: options['appType'],
        template: options['template'],
        language: options['language'],
        outDir: outDir || './',
        'skip-install': options['skipInstall'],
      }, done);
    });
  });

program
  .command('preview')
  .action(async (outDir, options)=>{
    /**
     * 列举逻辑分支
     * 拆分逻辑到各个handler
     * 
     * 1. pc工作台组件pc端预览
     * 2. 小程序、插件真机预览，显示预览二维码
     * 3. 小程序、插件ide预览
     */

    const rcPath = path.resolve('./', '.ddrc');
    const canPreview = checkCanPreview(rcPath);
    if (canPreview) {
      const pluginRoot = getPluginRoot();
      if (!pluginRoot) return;

      const pluginRc: IPluginRc = getRc(rcPath);
      const pcPluginDevOpts: IPcPluginDevOpts = {
        corpId: '',
        mode: '',
      };
      pcPluginDevOpts.corpId = get(pluginRc, 'previewOptions.corpId', '');
      pcPluginDevOpts.mode = get(pluginRc, 'previewOptions.mode', 'light');

      // preview基座
      const mockPreviewEnvironmentPath = path.join(__dirname, '../../h5bundle');
      // h5pro可执行路径
      const binPath = await getH5ProBinPath();

      if (!binPath) return;

      /** generate component.json */
      try {
        fs.copyFileSync(path.resolve(pluginRoot, 'plugin.json'), path.resolve(pluginRoot, 'component.json'));
      } catch(e) {
        console.error(e);
        error(e.message);
        return;
      }

      // h5pro ouput path
      const bundlePath = path.join(__dirname, '../../h5bundle/src/bundle');
      const spinner = logWithSpinner(' ', 'Building');
      
      /** build */
      const miniProjectJsonPath = path.resolve('./', 'mini.project.json');
      const miniProjectJsonCmdOpts = fs.existsSync(miniProjectJsonPath) ? miniProjectJsonPath : '';
      const command = `${binPath} component --watch --input=${pluginRoot} --output=${bundlePath} --mini-project-json=${miniProjectJsonCmdOpts}`;
      const buildCp = exec(command);
      let isInit = false;
      let firstBuildTimer: NodeJS.Timeout;
      
      buildCp.stdout && buildCp.stdout.on('data', (chunk)=>{
        const msg = chunk.toString();
        if (msg.indexOf('Built at:') !== -1 && !isInit) {
          spinner.text = 'Starting the development server';
          firstBuildTimer = setTimeout(()=>{
            event.emit('first-build-success');
          }, 500);
          isInit = true;
        } else if(msg.indexOf('ERROR in') !== -1) {
          error(msg);
          failSpinner('Build fail.');
          clearTimeout(firstBuildTimer);
          buildCp.kill();
          process.exit();
        }
      });

      buildCp.stdout?.pipe(process.stdout);
      buildCp.stderr?.pipe(process.stderr);

      buildCp.on('error', (err) => {
        failSpinner('Build fail');
        clearTimeout(firstBuildTimer);
        buildCp.kill();
        process.exit();
      });

      /** start dev server */
      event.on('first-build-success', startDevServer.bind(null, mockPreviewEnvironmentPath, pcPluginDevOpts));
    }
  });

program
  .command('upload')
  .action(async() => {
    const cwd = path.resolve('./');
    const rcPath = path.join(cwd, '.ddrc');
    const canUpload = checkCanUpload(rcPath);
    if (!canUpload) return;
    
    const rcContent: IWorkspaceRc = getRc(rcPath);
    const answers: {
      version: string;
    } = await inquirer.prompt([{
      type: 'input',
      name: 'version',
      message: 'Please input the version to upload, like 1.0.0',
      validate: (input) => {
        const isValid = semver.valid(input);
        if (!isValid) return 'The version you typing is not valid. Just type a version like 1.0.0';
        
        if (rcContent && rcContent.version) {
          const isGt = semver.gt(input, rcContent.version);
          if (!isGt) return `The version you typing must great than ${rcContent.version}, like ${semver.inc(rcContent.version, 'patch')}`;
        }

        return true;
      },
    }]);
    
    await opensdk.miniUpload({
      project: cwd,
      miniAppId: rcContent.miniAppId,
      packageVersion: answers.version,
      onProgressUpdate: (info)=>console.log(info.status, info.data),
    });

    // TODO: 上传成功的后置操作
  });

program
  .command('lint')
  .action(async() => {
    // 列举逻辑分支小程序/h5/插件
    // 小程序/h5只要eslint就可以，插件需要调接口做本地校验
    const cwd = path.resolve('./');
    const rcPath = path.join(cwd, '.ddrc');
    const rcContent: IWorkspaceRc = getRc(rcPath);
    if (!rcContent) {
      error(`Cannot read file ${rcPath}. Please check if the file exist or you have the permission to read.`);
      return;
    }

    const appType = rcContent.type;
    if ([EAppType.H5, EAppType.MP].indexOf(appType) !== -1) {
      // TODO: 透出eslint版本，拉cwd下的eslintrc去做校验
      const rcPath = path.resolve('./', '.ddrc');
      if (!fs.existsSync(rcPath)) {
        // 存量 前面判断了不存在.ddrc会直接报错
        const eslinter = new el.ESLint({
          cwd,
        });
        // match in all directories
        const res = await eslinter.lintFiles(['**']);
        console.log('eslint result', res);
      } else {
        // 增量
        const cp = exec('npm run lint');
        cp.stdout && cp.stdout.on('data', (chunk) => {
          const msg = chunk.toString();
          console.log(msg);
        });
      }
    } else if (appType === EAppType.PLUGIN) {
      const pluginRoot = getPluginRoot();
      if (!pluginRoot) return;
      // 获取rcJson
      const rcJson = await getRcJson();

      // res { result: boolean, data: string }
      const res = await pluginEl(pluginRoot, rcJson);
      // 打印校验结果
      console.log(res.data);

    } else {
      error(`AppType ${appType} is not support lint.`);
    }
  });

// output help information on unknown commands
program.on('command:*', ([cmd]) => {
  program.outputHelp();
  console.log('  ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd);
  process.exitCode = 1;
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.cyan('dd <command> --help')} for detailed usage of given command.`);
  console.log();
});

program.parse(process.argv);

function suggestCommands (unknownCommand: string) {
  let suggestion: string | undefined;
  program.commands.forEach(cmd => {
    const name = cmd.name();
    const isBestMatch = leven(name, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(name, unknownCommand) < 3 && isBestMatch) {
      suggestion = name;
    }
  });

  if (suggestion) {
    console.log('  ' + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`));
  }
}

async function startDevServer(mockPreviewEnvironmentPath: string, pcPluginDevOpts: IPcPluginDevOpts) {
  const miniprogramPath = path.resolve('./', 'miniprogram');
  const symbollink2miniprogram = path.join(__dirname, '../../h5bundle/src/miniprogram');

  if (fs.existsSync(symbollink2miniprogram)) {
    await clean(symbollink2miniprogram);
  }
  
  try {
    fs.symlinkSync(miniprogramPath, symbollink2miniprogram);
  } catch(e) {
    warn(`mock start fail. ${e.message}`);
  }

  const cp = exec(`cd ${mockPreviewEnvironmentPath} && npm run start`);
  debug(mockPreviewEnvironmentPath);
  cp.stdout && cp.stdout.on('data', (chunk)=>{
    const msg = chunk.toString();
    if (msg.indexOf('Starting the development server') !== -1) {
      stopSpinner();
      console.clear();
      const {
        corpId,
        mode,
      } = pcPluginDevOpts;

      open(`dingtalk://dingtalkclient/page/link?url=${urlencode(`http://127.0.0.1:12345?corpId=${corpId}&mode=${mode}&ddtab=true`)}`);
    } else if (msg.indexOf('Something is already running on port') !== -1) {
      stopSpinner();
      error(msg);
      process.exit();
    }
  });

  cp.stderr && cp.stderr.on('data', (err) => {
    stopSpinner();
    error(err.message);
  });

  cp.stdout?.pipe(process.stdout);
  cp.stderr?.pipe(process.stderr);

  cp.on('error', (err)=>{
    failSpinner('Start dev server fail');
    console.error(err);
    error(err.message);
    process.exit();
  });
}