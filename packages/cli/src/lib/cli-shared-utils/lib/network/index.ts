import detect from 'detect-port-alt';
import chalk from 'chalk';

const isRoot = process.getuid && process.getuid() === 0;

export function choosePort(host, defaultPort): Promise<number> {
  return detect(defaultPort, host).then(
    port =>
      new Promise(resolve => {
        if (port === defaultPort) {
          return resolve(port);
        }
        const message =
          process.platform !== 'win32' && defaultPort < 1024 && !isRoot
            ? 'Admin permissions are required to run a server on a port below 1024.'
            : `${defaultPort} 端口被占用。已经自动切换为 ${port}`;

        console.log(chalk.yellow(message));
        resolve(port);
      }),
    err => {
      throw new Error(
        chalk.red(`Could not find an open port at ${chalk.bold(host)}.`) +
          '\n' +
          ('Network error message: ' + err.message || err) +
          '\n'
      );
    }
  );
}