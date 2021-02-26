#!/usr/bin/env node
/* eslint-disable no-console */
import chalk from 'chalk';
import config from '../lib/common/config';
import program from 'commander';
import checkNodeVersion from '../lib/util/checkNodeVersion';
import yeomanRuntime from 'yeoman-environment';
import leven from 'leven';
import { done as doneLog, } from '../lib/cli-shared-utils/lib/logger';

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
      env.run(`${config.generator} ${outDir || ''}`, {
        appType: options['appType'],
        template: options['template'],
        language: options['language'],
        outDir: outDir || './',
        'skip-install': options['skipInstall'],
      }, done);
    });
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