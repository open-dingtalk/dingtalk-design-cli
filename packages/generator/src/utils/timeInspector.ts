import { time, } from 'console';

/**
 * inspect fn which run out of time
 * @param fn inspected callback, must be a promise
 * @param interval time interval
 */
export default async (fn: () => Promise<any>, opts?: Partial<{
  logger: Console['log'];
  interval: number;
  fetchingTips: string;
  timeout: number;
  timeoutTips: string;
}>): Promise<void> => {
  const {
    logger = console.log,
    interval = 3 * 1000,
    fetchingTips = 'fetching...',
    timeout = 30 * 1000,
    timeoutTips = 'task timeout',
  } = opts || {};

  const timer = setInterval(()=>{
    logger(fetchingTips);
  }, interval);

  const killerTimer = setTimeout(()=>{
    clearInterval(timer);
    clearTimeout(killerTimer);
    throw timeoutTips;
  }, timeout);

  try {
    await fn();
  } finally {
    clearInterval(timer);
    clearTimeout(killerTimer);
  }
};