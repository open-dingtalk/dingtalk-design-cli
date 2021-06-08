import { spawn, } from 'child_process';
import { getLogger, } from '../cli-shared-utils/lib/logger';
import * as path from 'path';

const logger = getLogger('gulpInspector');

export default (gulpBin: string, opts: {
  gulpfile: string;
  src: string;
  dist: string;
  cwd: string;
}, hooks?: {
  onError,
}) => {
  const {
    gulpfile,
    src,
    dist,
    cwd,
  } = opts;

  const cp = spawn(
    'node', 
    [
      require.resolve(gulpBin),
      '--gulpfile', gulpfile,
      '--src', src,
      '--dist', dist,
      '--color' // preserve the terminal color 
    ],
    {
      stdio: 'inherit',
      cwd,
      env: process.env,
    }
  );

  cp.on('error', (err) => {
    logger.debug('gulpInspector exit witch err', err);
    hooks.onError && hooks.onError(err);
    process.exit(1);
  });
};