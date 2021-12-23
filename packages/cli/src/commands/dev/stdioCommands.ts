/**
 * Module dependencies
 */
import chalk from 'chalk';
import cac from 'cac';
import { getLogger, } from '../../lib/cli-shared-utils/lib/logger'; 

const whiteHighlight = (v: string): string => chalk.bgWhiteBright(chalk.black(` ${v} `));
const logger = getLogger('stdioCommands');

export type StdinCommandSubscriberCallback = (args: string[], options: Record<string, string>) => void;
 
export interface IStdinCommandSubscriber {
   /**
    * Commad name
    */
   command: string;
   /**
    * Shortcut
    */
   shortcut?: boolean;
   /**
    * Commad description
    */
   description: string;
   /**
    * Command action
    */
   action: StdinCommandSubscriberCallback;
   /**
    * Serialized to the log or not
    */
   serialized?: boolean;
 }
 
export class StdinCommand {
   subscribers: Array<IStdinCommandSubscriber>;
 
   private stdinListener: (chunk: Buffer) => void;
 
   constructor() {
     this.subscribers = [];
     this.stdinListener = (chunk: Buffer): void => {
       const cli = cac();
       const argv = [
         '', // process.execPath
         '', // executable file path
         ...chunk.toString('utf-8').trim().split(' '),
       ];
       const { args, options, } = cli.parse(argv, { run: false, });
       this.publish(args[0], options);
     };
   }
 
   bootstrap(): void {
     process.stdin.resume();
     process.stdin
       && process.stdin.on('data', this.stdinListener);
   }
 
   subscribe(subscriber: IStdinCommandSubscriber): void {
     subscriber = {
       serialized: true,
       shortcut: true,
       ...subscriber,
     };
     this.subscribers.push(subscriber);
   }

   getTargetSubscriber(matchedCommand: string) {
     return this.subscribers.find(s => s.command === matchedCommand);
   }

   publish(
     command: string,
     options: {
       [k: string]: any;
     }
   ): void {
     logger.debug('command', command);
     logger.debug('options', options);

     // 忽略大小写
     const matchedCommand = command;
     const targetSubscriber = this.getTargetSubscriber(matchedCommand);
     if (targetSubscriber) {
       targetSubscriber.action([matchedCommand], options);
     } else if (matchedCommand) {
       logger.warn('未找到对应的命令，可尝试下面的命令');
       logger.info(this.toString());
     }
   }
 
   tips(): void {
     logger.tip('在当前命令行中敲入 「help + 回车」可再次查阅可以使用的Stdin命令');
   }

   unsubscribe(command: string): void {
     const targetIndex = this.subscribers.findIndex(s => s.command === command);
     this.subscribers.splice(targetIndex, 1);
   }
 
   dispose(): void {
     process.stdin && process.stdin.removeListener('data', this.stdinListener);
   }
 
   toString() {
     return `
   Stdin Commands:
   
  ${this.subscribers
    .filter(subscriber => subscriber.serialized)
    .map((subscriber, index) => {
      if (subscriber.description) {
        return ` - ${whiteHighlight(subscriber.command)}: ${subscriber.description}`;
      }
      return '';
    }).filter(v => v).join('\n  ')
}
   `;
   }

   log() {
     console.log('');
     console.log(this.toString());
   }
}
 
export const GlobalStdinCommand = new StdinCommand();
 