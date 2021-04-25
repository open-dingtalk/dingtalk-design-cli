#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from 'chalk';
import config from '../lib/common/config';
import program from 'commander';
import checkNodeVersion from '../lib/util/checkNodeVersion';
import yeomanRuntime from 'yeoman-environment';
import leven from 'leven';
import { done as doneLog, debug, error, info, } from '../lib/cli-shared-utils/lib/logger';
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
import { get, } from 'lodash';
import { IPcPluginDevOpts, IPluginRc, } from '../lib/common/types';

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
    // const rcPath = path.resolve('./', '.ddrc');
    const canPreview = checkCanPreview();
    if (canPreview) {
      const pluginRoot = getPluginRoot();
      if (!pluginRoot) return;

      const pluginRc: IPluginRc = getRc(path.join(pluginRoot, '.ddrc'));
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
      const command = `${binPath} component --watch --input=${pluginRoot} --output=${bundlePath}`;
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

function startDevServer(mockPreviewEnvironmentPath: string, pcPluginDevOpts: IPcPluginDevOpts) {
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