import ora from 'ora';
import chalk from 'chalk';

const spinner = ora();
let lastMsg: {
  symbol: string;
  text: string;
} | null = null;
let isPaused = false;

export const logWithSpinner = (symbol: string, msg: string): void => {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green('✔');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = ' ' + msg;
  lastMsg = {
    symbol: symbol + ' ',
    text: msg,
  };
  spinner.start();
};

export const stopSpinner = (persist?: boolean): void => {
  if (!spinner.isSpinning) {
    return;
  }

  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

export const pauseSpinner = (): void => {
  if (spinner.isSpinning) {
    spinner.stop();
    isPaused = true;
  }
};

export const resumeSpinner = (): void => {
  if (isPaused) {
    spinner.start();
    isPaused = false;
  }
};

export const failSpinner = (text: string): void => {
  spinner.fail(text);
};