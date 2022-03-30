import fs from 'fs';
import path from 'path';

export default function writePortFile(port: number): void {
  fs.writeFileSync(path.join(__dirname, '../../actions/port.js'), `window.miniapp_proxy_server_port = ${port};`);
}
