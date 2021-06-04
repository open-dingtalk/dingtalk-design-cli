import * as fs from 'fs';
import { logger, } from '../cli-shared-utils/lib/logger';
import { EAppType, IWorkspaceRc, } from '../common/types';

export default (rcPath: string) => {
  const isExist = fs.existsSync(rcPath);
  if (!isExist) {
    logger.error('当前目录检测不到.ddrc文件，无法识别该应用类型，请添加.ddrc文件后再尝试');
    return false;
  }

  let rcContentStr = '';
  try {
    rcContentStr = fs.readFileSync(rcPath, {
      encoding: 'utf-8',
    });
  } catch(e) {
    logger.error('.ddrc文件读取失败，请检查当前操作用户是否有当前目录的操作权限');
    return false;
  }
  
  let rcContent: IWorkspaceRc;
  try {
    rcContent = JSON.parse(rcContentStr);
  } catch(e) {
    logger.error('.ddrc文件解析失败，请检查文件内容是否符合标准的JSON SCHEMA');
    return false;
  }

  if ([EAppType.MP, EAppType.PLUGIN].indexOf(rcContent.type) === -1) {
    logger.error('upload只支持小程序和插件');
    return false;
  }

  if (!rcContent.miniAppId) {
    logger.error('请从开发者后台的应用管理页面获取应用的miniAppId');
    return false;
  }

  if (!rcContent.apiToken) {
    logger.error('请从开发者后台首页获取apiToken（到时贴一下开发者文档的介绍链接）');
    return false;
  }

  return true;
};