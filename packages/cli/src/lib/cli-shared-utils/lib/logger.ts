/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import * as readline from 'readline';
import EventEmitter from 'events';
import { stopSpinner, } from './spinner';

exports.events = new EventEmitter();

const format = (label: string, msg: string) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : line.padStart(stripAnsi(label).length);
  }).join('\n');
};

const chalkTag = (msg?: string | null) => chalk.bgBlackBright.white.dim(` ${msg} `);

export const log = (msg = '', tag = null): void => {
  tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};

export const info = (msg = '', tag = null): void => {
  console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg));
};

export const done = (msg = '', tag = null): void => {
  console.log(format(chalk.bgGreen.black(' DONE ') + (tag ? chalkTag(tag) : ''), msg));
};

export const warn = (msg = '', tag = null): void => {
  console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)));
};

export const debug = (msg: string) => {
  const txt = format(chalk.bgBlue.black(' DEBUG '), msg);
  // @ts-ignore
  return process.env.NODE_ENV === '__DEBUG__' &&  console.log(txt);
};

export const error = (msg: string | Error, tag = null): void => {
  if (!msg) return;
  stopSpinner();
  console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)));
  if (msg instanceof Error) {
    console.error(msg.stack);
  }
};

export const clearConsole = (title: string): void => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows);
    console.log(blank);
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    if (title) {
      console.log(title);
    }
  }
};
