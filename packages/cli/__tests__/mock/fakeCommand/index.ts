/**
 * fakeCommand
 * 用来测试
 */
import CommandWrapper from '../../../src/scheduler/command/commandWrapper';

export interface ICommandOptions {
   test: boolean;
 }
 
export default CommandWrapper<ICommandOptions>({
  // @ts-ignore
  name: 'fakeCommand',
  // @ts-ignore
  registerCommand(ctx) {
    return {
      command: {
        name: 'fakeCommand',
        description: '测试',
      },
      options: {
        test: {
          description: '选项',
          default: '',
          type: 'string',
        },
      },
      action: async (options) => {
        return {
          ctx,
          options,
        };
      },
    };
  },
});