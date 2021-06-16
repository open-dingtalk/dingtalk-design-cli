import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

const format = (label: string, msg: string) => {
  return msg.split('\n').map((line, i) => {
    return i === 0
      ? `${label} ${line}`
      : line.padStart(stripAnsi(label).length);
  }).join('\n');
};

export const debug = (msg: string) => {
  const txt = format(chalk.bgBlue.black(' DEBUG '), msg);
  return process.env.DEBUG &&  console.log(txt);
};

export const info = (msg: string, pure?: boolean): string | void => {
  const txt = format(chalk.bgBlue.black(' INFO '), msg);
  return pure ? txt : console.log(pure);
};
  
export const done = (msg: string, pure?: boolean): string | void  => {
  const txt = format(chalk.bgGreen.black(' DONE '), msg);
  return pure ? txt : console.log(pure);
};

export const warn = (msg: string, pure?: boolean): string | void  => {
  const txt = format(chalk.bgYellow.black(' WARN '), msg);
  return pure ? txt : console.warn(pure);
};

export const error = (msg: string, pure?: boolean): string | void  => {
  const txt = format(chalk.bgRed(' ERROR '), msg);
  return pure ? txt : console.error(pure);
};