import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import chalk from 'chalk';

export default async function createManifest(output: string, logger?: Console['log']) {
  return new Promise((resolve) => {
    const jsonPath = path.resolve(output, 'devManifest.json');
    fs.readFile(jsonPath, 'utf8', (err, jsonString) => {
      if (err) {
        logger(chalk.red.bold(`Cannot find devManifest.json in ${jsonPath}`));
        process.exit(1);
      }
      const jsonData = JSON.parse(jsonString) as any;
      jsonData.dev.id = 'dingdocs-' + uuid().substring(0, 18);
      fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
          logger(chalk.red.bold(`Cannot find devManifest.json in ${jsonPath}`));
          process.exit(1);
        }
        resolve(true);
      })
    });
  });
}