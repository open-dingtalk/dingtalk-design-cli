import urllib from 'urllib';
import { logger, } from '../cli-shared-utils/lib/logger';
import getMonitor from '../cli-shared-utils/lib/monitor/framework-monitor';
import config from '../common/config';

const monitor = getMonitor(config.yuyanId);

interface IMt2Config {
  frameworkConfig: {
    miniAppHtml: string;
    h5Html: string;
  }
}

export default async (): Promise<IMt2Config> => {
  try {
    const res = await urllib.request<IMt2Config>(config.mt2Config, {
      method: 'GET',
      dataType: 'json',
    });
    return res.data;
  } catch(e) {
    logger.debug('请求mt2Config失败', e);
    monitor.logJSError(e);
    return null;
  }
};