import { execSync, } from 'child_process';
import * as path from 'path';

/**
 * 会强制覆盖目标文件且静默
 */
export default (source: string, dest: string) => {
  try {
    execSync(`cp -af ${path.join(source, '/')} ${dest}`);
  } catch(e) {
    console.error('exec cp error', e);
    throw e;
  }
};