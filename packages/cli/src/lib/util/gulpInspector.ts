import { spawn, } from 'child_process';
import { getLogger, } from '../cli-shared-utils/lib/logger';
import stripAnsi from 'strip-ansi';
import { isWindows, } from '../cli-shared-utils';

const logger = getLogger('gulpInspector');

export default (gulpBin: string, opts: {
  gulpfile: string;
  src: string;
  dist: string;
  cwd: string;
}, hooks?: {
  onError?: (err: Error) => void,
  onDone?: () => void,
}): void => {
  const {
    gulpfile,
    src,
    dist,
    cwd,
  } = opts;

  const cp = spawn(
    require.resolve(gulpBin), 
    [
      '--gulpfile', gulpfile,
      '--src', src,
      '--dist', dist,
      '--color' // preserve the terminal color 
    ],
    {
      stdio: 'pipe',
      cwd,
      env: process.env,
      shell: true,
    }
  );

  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  cp.stdout.on('data', (chunk)=>{
    const data = stripAnsi(chunk.toString());
    if (data.indexOf('Starting \'auto\'...') !== -1) {
      hooks.onDone && hooks.onDone();
    }
  });
  cp.on('error', (err) => {
    logger.debug('gulpInspector exit witch err', err);
    hooks.onError && hooks.onError(err);
  });
};