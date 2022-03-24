import fs from 'fs';
import path from 'path';
import { logger, } from '../cli-shared-utils/lib/logger';

export default function writePortFile(port: number): void {
  try {
    fs.writeFileSync(path.join(__dirname, '../../actions/port.js'), `window.miniapp_proxy_server_port = ${port};`);
  } catch (e) {
    logger.error('port.js write fail', e);
  }
}
