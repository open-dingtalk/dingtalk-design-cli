import YuyanMonitor, { IMonitorOpts, ILogItem, } from './yuyan-monitor';
import { isPlainObject, } from 'lodash';

export interface IFrameworkMonitorOpts extends IMonitorOpts {
  debug?: boolean;
}

export default class FrameworkMonitor {
  private Tracert: YuyanMonitor;
  private pendingLogItems: ILogItem[];

  constructor(public opts: IFrameworkMonitorOpts) {
    this.Tracert = new YuyanMonitor({
      yuyanId: opts.yuyanId,
      _appId: opts._appId,
      env: opts.env,
    });
    this.pendingLogItems = [];
  }

  public async log(logItem: ILogItem, immediately = false): Promise<any> {
    if (immediately) {
      if (this.opts.debug) {
        console.log('log', JSON.stringify(logItem));
      }

      try {
        await this.Tracert.log(logItem);
      } catch (e) {
        // do not handle/log this error.
      }
    } else {
      return this.pendingLogItems.push(logItem);
    }
  }

  public async flush(): Promise<void> {
    while (this.pendingLogItems.length) {
      const logItem = this.pendingLogItems.shift();
      const normalizedLogItem = logItem;
      if (Array.isArray(normalizedLogItem)) {
        normalizedLogItem.forEach(item => this.log(item, true));
      } else if (isPlainObject(normalizedLogItem)) {
        this.log(normalizedLogItem, true);
      }
    }
  }
}