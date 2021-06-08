import ora from 'ora';
import chalk from 'chalk';

const spinner = ora({
  discardStdin: false,
});
let lastMsg: { symbol: string; text: string } | null = null;
let isPaused = false;

export function logWithSpinner(symbol: string, msg?: string) {
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
  spinner.text = ` ${msg}`;
  lastMsg = {
    symbol: `${symbol} `,
    text: msg,
  };
  spinner.start();
}

export function stopSpinner(text?: string, persist?: boolean) {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: text || lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
}

export function pauseSpinner() {
  if (spinner.isSpinning) {
    spinner.stop();
    isPaused = true;
  }
}

export function resumeSpinner() {
  if (isPaused) {
    spinner.start();
    isPaused = false;
  }
}

export function successSpinner(text: string) {
  spinner.stopAndPersist({
    symbol: lastMsg.symbol,
    text: text || lastMsg.text,
  });
}

export function failSpinner(text: string) {
  spinner.fail(text);
}
