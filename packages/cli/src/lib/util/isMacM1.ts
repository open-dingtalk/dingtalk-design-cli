import * as os from 'os';
import { logger, } from '../cli-shared-utils/lib/logger';

export default (): boolean => {
  try {
    const cpus = os.cpus();
    const m1Cpu = cpus.find(cpu => cpu.model === 'Apple M1');
    return !!m1Cpu;
  } catch(e) {
    logger.error(e);
    return false;
  }
};