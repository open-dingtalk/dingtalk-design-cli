import leven from 'leven';
import chalk from 'chalk';
import { logger, } from '../cli-shared-utils/lib/logger';
import { ECommandName, } from '../common/types';

/**
 * 当开发者输入一个错误命令时，比对目前已经注册的命令，提取最接近输入的命令进行校正提示
 */
export default (unknownCommand: string, commandNameList: (ECommandName | '')[]): void => {
  let suggestion: string | undefined;
  commandNameList.forEach(name => {
    const isBestMatch = leven(name, unknownCommand) < leven(suggestion || '', unknownCommand);
    if (leven(name, unknownCommand) < 3 && isBestMatch) {
      suggestion = name;
    }
  });

  if (suggestion) {
    console.log('  ' + chalk.red(`未能找到命令${unknownCommand}，相似的命令有 ${chalk.yellow(suggestion)}`));
  } else {
    logger.debug(`未找到与 ${unknownCommand} 类似的命令`);
  }
};