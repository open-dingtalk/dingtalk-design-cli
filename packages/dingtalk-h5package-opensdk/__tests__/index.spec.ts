import { packTarGz, } from '../src/index';
import path from 'path';
import decompress from 'decompress';
import fs from 'fs';

describe('dingtalk-opensdk-h5package', () => {
  afterEach(async () => {
    fs.unlinkSync(path.join(__dirname, 'output'));
  });

  it('zip', async () => {
    const result = await packTarGz(
      path.join(__dirname, 'source'),
      path.join(__dirname, 'output/zip.tar.gz')
    );

    const files = await decompress(
      result.output,
      path.join(__dirname, 'output')
    );

    console.log(files);
  });
});
