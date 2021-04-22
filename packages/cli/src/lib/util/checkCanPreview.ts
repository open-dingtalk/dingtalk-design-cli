import * as fs from 'fs';
import { error, } from '../cli-shared-utils/lib/logger';

export default (rcPath: string) => {
  const isExist = fs.existsSync(rcPath);
  if (!isExist) {
    error('当前目录检测不到.ddrc文件，无法识别该应用类型，请添加.ddrc文件后再尝试');
    return false;
  }

  let rcContentStr = '';
  try {
    rcContentStr = fs.readFileSync(rcPath, {
      encoding: 'utf-8',
    });
  } catch(e) {
    error('.ddrc文件读取失败，请检查当前操作用户是否有当前目录的操作权限');
    return false;
  }
  
  let rcContent = {
    type: '',
  };
  try {
    rcContent = JSON.parse(rcContentStr);
  } catch(e) {
    error('.ddrc文件解析失败，请检查文件内容是否符合标准的JSON SCHEMA');
    return false;
  }

  if (rcContent.type !== 'plugin') {
    error('当前应用类型非plugin，暂不支持preview功能');
    return false;
  }
  
  return true;
};