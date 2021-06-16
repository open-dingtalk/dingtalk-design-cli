import chalk from 'chalk';
import * as semver from 'semver';
import boxen from 'boxen';
import getVersions from './getVersions';
import getGlobalInstallCommand from './getGlobalInstallCommand';
import { debug, } from './logger';

export default async function generateTitle(checkUpdate: boolean): Promise<string> {
  const { current, latest, error, } = await getVersions();
  
  let title = chalk.bold.blue(`Dingding Worktab-Plugin v${current}`);
  if (error) {
    debug(error);
    title += '\n' + chalk.red('Failed to check for updates');
  }

  if(checkUpdate && semver.gt(latest, current)) {
    let upgradeMessage = `New version available ${chalk.magenta(current)} → ${chalk.green(latest)}`;

    try {
      const command = getGlobalInstallCommand();
      let name = require('../../package.json').name;
      if (semver.prerelease(latest)) {
        name += '@next';
      }

      if (command) {
        upgradeMessage +=
        `\nRun ${chalk.yellow(`${command} ${name}`)} to update!`;
      }
    // eslint-disable-next-line no-empty
    } catch(e) {
    } finally {
      const upgradeBox = boxen(upgradeMessage, {
        align: 'center',
        borderColor: 'green',
        dimBorder: true,
        padding: 1,
      });
      title += `\n${upgradeBox}\n`;
    }
  }

  return title;
}