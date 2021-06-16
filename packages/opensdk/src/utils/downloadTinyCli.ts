import fs from 'fs-extra';
import path from 'path';
import download from './download';
import os from 'os';

const config = {
  version: 'tiny6.3.0_cube0.49.18',
  darwin: 'https://gw.alipayobjects.com/os/bmw-prod/1588a3b3-5a5f-48a9-a11c-88ada68f3107.tgz',
  win32: 'https://gw.alipayobjects.com/os/bmw-prod/da38f87f-4e51-4eb5-a6e2-ae3223ec89fe.tgz',
  win7: 'https://gw.alipayobjects.com/os/bmw-prod/503e2143-c58b-4ac9-aae6-fb97637488ec.tgz',
  linux: 'https://gw.alipayobjects.com/os/bmw-prod/6026c82a-bd10-4eaa-9e06-3c5fd22c4c15.tgz',
};

const platform = os.platform();

const downloadPath = path.join(os.homedir(), '.dd', 'compiler', config.version);
let name = 'mini-pkg-builder';

let downloadURL: string;

if (platform === 'win32') {
  if (!os.release().startsWith('10.0')) {
    downloadURL = config.win7;
    name = 'mini-pkg-builder-win7.exe';
  } else {
    downloadURL = config.win32;
    name = 'mini-pkg-builder.exe';
  }
} else {
  downloadURL = config[platform];
}

export { config, downloadPath, name, downloadURL };


export default async function () {
  const successFilePath = path.join(downloadPath, 'dd_download_success');
  if (downloadURL) {
    if (!process.env.FORCE_DOWNLOAD && fs.existsSync(successFilePath)) {
      console.log(`compiler exists: ${config.version} `);
    } else {
      await fs.remove(downloadPath);
      await fs.ensureDir(downloadPath);
      try {
        await download(downloadURL, downloadPath);
        await fs.writeFile(successFilePath, '');
        console.log('下载完成');
      } catch (err) {
        console.log('下载失败');
        await fs.remove(downloadPath);
        throw err;
      }
    }
  } else {
    const list = Object.keys(config);
    console.log(`当前系统为 ${process.platform} dd 支持 ${list.join()}，部分功能可能会无法使用`);
  }
}
