import { logger, } from '../lib/cli-shared-utils/lib/logger';
import config from '../lib/common/config';
import { setJsonItem, } from '../lib/util/setJson';
import * as path from 'path';

interface IOpts {
  cwd: string;
  configKey: string;
  configValue: any;
}

export default async (opts: IOpts) => {
  const {
    configKey,
    cwd,
    configValue,
  } = opts;

  if(setJsonItem(path.join(cwd, config.workspaceRcName), configKey, configValue)) {
    logger.success('更新配置文件成功', `配置文件中 ${configKey} 字段被设置为 ${configValue}`);
  }

};