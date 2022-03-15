/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
import chalk from 'chalk';
import { execSync, execFileSync, } from 'child_process';
import { ExecFileSyncOptionsWithStringEncoding, ExecSyncOptionsWithStringEncoding, } from 'node:child_process';
import * as path from 'path';
 
const execOptions = {
  encoding: 'utf8',
  stdio: [
    'pipe', // stdin (default)
    'pipe', // stdout (default)
    'ignore', //stderr
  ],
};
 
function isProcessAReactApp(processCommand) {
  return /^node .*react-scripts\/scripts\/start\.js\s?$/.test(processCommand);
}
 
function getProcessIdOnPort(port) {
  return execFileSync('lsof', ['-i:' + port, '-P', '-t', '-sTCP:LISTEN'], execOptions as ExecFileSyncOptionsWithStringEncoding)
    .split('\n')[0]
    .trim();
}
 
function getPackageNameInDirectory(directory) {
  const packagePath = path.join(directory.trim(), 'package.json');
 
  try {
    return require(packagePath).name;
  } catch (e) {
    return null;
  }
}
 
function getProcessCommand(processId, processDirectory) {
  let command: string = execSync(
    'ps -o command -p ' + processId + ' | sed -n 2p',
    execOptions as ExecSyncOptionsWithStringEncoding
  );
 
  command = command.replace(/\n$/, '');
 
  if (isProcessAReactApp(command)) {
    const packageName = getPackageNameInDirectory(processDirectory);
    return packageName ? packageName : command;
  } else {
    return command;
  }
}
 
function getDirectoryOfProcessById(processId) {
  return execSync(
    'lsof -p ' +
       processId +
       ' | awk \'$4=="cwd" {for (i=9; i<=NF; i++) printf "%s ", $i}\'',
    execOptions as ExecSyncOptionsWithStringEncoding
  ).trim();
}
 
export default function getProcessForPort(port: number | string): string | null {
  try {
    const processId = getProcessIdOnPort(port);
    const directory = getDirectoryOfProcessById(processId);
    const command = getProcessCommand(processId, directory);
    return (
      chalk.cyan(command) +
       chalk.grey(' (pid ' + processId + ')\n') +
       chalk.blue('  in ') +
       chalk.cyan(directory)
    );
  } catch (e) {
    return null;
  }
}
 