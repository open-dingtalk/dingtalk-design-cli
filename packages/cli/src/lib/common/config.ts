import * as os from 'os';
import * as path from 'path';

const homeDir = os.homedir();

export default {
  generatorNamespace: 'dd-application:app',
  workspaceRcName: 'ding.config.json', // IWorkspaceRc
  globalRc: path.join(homeDir, '.ddrc'), // IGlobalRc
  yuyanId: '180020010101199026',
  h5pro: {
    binStoreDir: path.join(homeDir, '.dd-h5bundle-bin'),
    //FIXME:xhf-文件地址
    // https://yuyan.antfin-inc.com/h5pro/file/detail/6232f1f382a92304d2dde640?page=1&type=others
    platforms: {
      win32: {
        binDownloadUrl: 'https://gw.alipayobjects.com/os/bmw-prod/fe83afd2-0288-4c44-b984-326a3a4326d9.gz',
        binName:'h5pro-component-win.tar.gz',
        binExtractPath: 'h5pro-component-win.exe',
      },
      darwin: {
        binDownloadUrl: 'https://gw.alipayobjects.com/os/bmw-prod/117fa8aa-33cf-48ec-9590-0d6cbe8bb704.gz',
        binName:'h5pro-component-macos.tar.gz',
        binExtractPath: 'h5pro-component-macos',
      },
    },
    h5bundlePort: '3001',
  },
  mt2Config: 'https://hudong.alicdn.com/api/data/v2/7334dc6bc97b408c9cdf0884f6fb01d4.js?t=1642494634940',
  webSimulator: {
    tarUrl: 'https://gw.alipayobjects.com/as/g/lyra/lyra-integration/6.1.27/lyra-web.tgz',
    storeDir: path.join(homeDir, '.dd-web-simulator-assets'),
    assetsPort: 8003,
    frameworkPort: 10003,
    proxyServerPort: 10005,
    targetH5Port: 3000,
    webSimulatorFrameworkStoreDir: path.join(homeDir, '.webSimulatorFramework'),
    webSimulatorFrameworkHtmlName: 'webSimulator.html',
  },
  ngrok: {
    binStoreDir: path.join(homeDir, '.dd-ngrok-bin'),
    platforms: {
      win32: {
        binDownloadUrl: 'https://gw.alipayobjects.com/os/bmw-prod/ae844ce0-bc58-43bd-ab09-2b3eebbff962.gz',
        binBaseName: 'ding_win64.tar.gz',
        binExtractPath: 'ding.exe',
      },
      darwin: {
        binDownloadUrl: 'https://gw.alipayobjects.com/os/bmw-prod/29771d24-a266-437e-a529-b0b42e5c6c38.gz',
        binBaseName: 'ding_mac.tar.gz',
        binExtractPath: 'ding',
      },
      m1: {
        binDownloadUrl: 'https://gw.alipayobjects.com/os/bmw-prod/146ec2d7-7ab6-442e-b742-fa999c62c82a.gz',
        binBaseName: 'ding_mac.tar.gz',
        binExtractPath: 'ding',
      },
    },
  },
};