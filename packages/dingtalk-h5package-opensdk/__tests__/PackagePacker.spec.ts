import { PackagePacker, urlToPath, pathToUrl } from '../src/PackagePacker';
import path from 'path';


describe('PackagePacker', () => {

  it('urlToPath', async () => {
    const uc = {
      'https://www.dingtalk.com': 'www.dingtalk.com',
      'https://www.dingtalk.com/': 'www.dingtalk.com',
      'https://www.dingtalk.com/abc': 'www.dingtalk.com/abc',
      'https://www.dingtalk.com/abc/': 'www.dingtalk.com/abc',
      'https://www.dingtalk.com/abc/index.html': 'www.dingtalk.com/abc/index.html',
      'https://www.dingtalk.com:8484/abc/index.html': 'www.dingtalk.com@8484/abc/index.html',
    };

    Object.keys(uc).forEach((url) => {
      expect(urlToPath(url)).toBe(uc[url]);
    });  
  });

  it('pathToUrl', async () => {
    const uc = {
      'www.dingtalk.com': 'https://www.dingtalk.com',
      'www.dingtalk.com/abc': 'https://www.dingtalk.com/abc',
      'www.dingtalk.com/abc/index.html': 'https://www.dingtalk.com/abc/index.html',
      'www.dingtalk.com@8484/abc/index.html': 'https://www.dingtalk.com:8484/abc/index.html',
    };

    Object.keys(uc).forEach((path) => {
      expect(pathToUrl(path)).toBe(uc[path]);
    });
  });

  it('appendFile', async () => {
    const packer = new PackagePacker();
    await packer.appendFile(
      'https://www.example.com/index.html',
      path.join(__dirname, './source/index.html')
    );
    await packer.appendFile(
      'https://www.example.com/index.js',
      path.join(__dirname, './source/vendor.js')
    );
    await packer.appendFile(
      'https://www.example.com/sub',
      path.join(__dirname, './source')
    );
    await packer.appendUrl(
      'https://g.alicdn.com/code/lib/react/0.0.0-0c756fb-f7f79fd/cjs/react.development.js'
    );
    const dist = await packer.finalize();

    console.log(dist);
  }, 60000);
});
