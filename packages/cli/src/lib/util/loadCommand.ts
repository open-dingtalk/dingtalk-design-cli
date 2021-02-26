import { chalk, } from '../cli-shared-utils';
import getGlobalInstallCommand from './getGlobalIntallCommand';

export default function loadCommand (commandName: string, moduleName: string): any {
  
  const isNotFoundError = (err: any) => {
    return err.message.match(/Cannot find module/);
  };
  try {
    return require(moduleName);
  } catch (err) {
    if (isNotFoundError(err)) {
      try {
        return require('import-global')(moduleName);
      } catch (err2) {
        if (isNotFoundError(err2)) {
          const installCommand = getGlobalInstallCommand();
          console.log();
          console.log(
            `  Command ${chalk.cyan(`vue ${commandName}`)} requires a global addon to be installed.\n` +
            `  Please run ${chalk.cyan(`${installCommand} ${moduleName}`)} and try again.`,
          );
          console.log();
          process.exit(1);
        } else {
          throw err2;
        }
      }
    } else {
      throw err;
    }
  }
}