import tar from 'tar';
import ProgressBar from 'progress';
import { promisify, } from 'util';
import stream from 'stream';
import got from 'got';

async function download(url: string, target: string) {
  let bar: ProgressBar;
  let transferred = 0;
  await promisify(stream.pipeline)(
    got.stream(url).on('downloadProgress', (progress) => {
      if (!bar) {
        bar = new ProgressBar('download compiler [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 20,
          total: progress.total,
        });
      }
      bar.tick(progress.transferred - transferred);
      transferred = progress.transferred;
    }),
    tar.x({ cwd: target, })
  );
}

export default download;
