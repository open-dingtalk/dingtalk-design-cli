import CommandWrapper from '../../scheduler/command/commandWrapper';
import { ECommandName, } from '../../lib/common/types';
import commandsConfig from '../commandsConfig';
import init from '../../actions/init';

interface ICommandOptions {
  appType?: string;
  template?: string;
  language?: string;
  'skip-install'?: boolean;
  outDir?: string;
}

export default CommandWrapper<ICommandOptions>({
  name: ECommandName.init,
  registerCommand(ctx) {
    return {
      ...commandsConfig.init,
      action: async (options) => {
        ctx.logger.debug('cli options', options);
        await init(options);
      },
    };
  },
});