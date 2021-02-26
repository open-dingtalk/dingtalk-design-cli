const minimist = require('minimist');
const path = require('path');
const rawArgs = process.argv.slice(2);
const args = minimist(rawArgs);
const configPath = path.join(__dirname, '../jest.config.js');

let regex;
if (args.p) {
  const packages = (args.p || args.package).split(',').join('|');
  regex = `.*(${packages})/.*\\.spec\\.ts$`;
  const i = rawArgs.indexOf('-p');
  rawArgs.splice(i, 2);
}

const jestArgs = [
  '--env', 'node',
  '--runInBand',
  '--config', configPath,
  ...rawArgs,
  ...(regex ? [regex] : []),
];

console.log(`running jest with args: ${jestArgs.join(' ')}`);

require('jest').run(jestArgs);