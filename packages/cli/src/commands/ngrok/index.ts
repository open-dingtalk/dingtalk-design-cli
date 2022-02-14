import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import lint from '../../actions/lint';
import commmandsConfig from '../commandsConfig';
import config from '../../lib/common/config';
import getNgrokBinPath from '../../lib/util/getNgrokBinPath';
import { isWindows, } from '../../lib/cli-shared-utils';
import { spawn, } from 'child_process';
import path from 'path';
import { logger, } from '../../lib/cli-shared-utils/lib/logger';
import getMonitor from '../../lib/cli-shared-utils/lib/monitor/framework-monitor';

interface ICommandOptions {
  subdomain: string;
  config: string;
  port: string;
}

const monitor = getMonitor(config.yuyanId);

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.ngrok,
  registerCommand(ctx) {
    return {
      ...commmandsConfig.ngrok,
      action: async (options) => {
        const {
          cwd,
          dtdConfig,
        } = ctx;

        const {
          subdomain,
          port,
          config,
        } = options;

        const ngrokBinPath = await getNgrokBinPath();
        ctx.logger.debug('ngrokBinPath', ngrokBinPath);
     
        const ngrokCp = spawn(
          require.resolve(ngrokBinPath),
          [
            `-config=${config || path.join(__dirname, './ding.cfg')}`,
            `-subdomain=${subdomain}`,
            port,
          ],
          {
            stdio: 'pipe',
            cwd,
            env: process.env,
            shell: isWindows,
          }
        );
        ngrokCp.stdout.pipe(process.stdout);
        ngrokCp.stderr.pipe(process.stderr);
        // ngrokCp.stdout.on('data', (chunk)=>{});

        ngrokCp.on('error', (err) => {
          logger.error('钉钉内网穿透工具启动失败', err.message);
          ngrokCp.kill();
          monitor.logJSError(err);
        });
      },
    };
  },
});