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
    platforms: {
      win32: {
        binDownloadUrl: 'https://aci-store.cn-hangzhou-alipay-b.oss-cdn.aliyun-inc.com/aci/aci-artifacts-20210402165651-55d67c44-943b-4eba-ac2b-2ebcca80ef38/packages/toolkit/bin/h5pro-component-win.exe.tar.gz',
        binExtractPath: '',
      },
      darwin: {
        binDownloadUrl: 'https://aci-store.cn-hangzhou-alipay-b.oss-cdn.aliyun-inc.com/aci/aci-artifacts-20210402165651-55d67c44-943b-4eba-ac2b-2ebcca80ef38/packages/toolkit/bin/h5pro-component-macos.tar.gz',
        binExtractPath: 'home/jenkins/agent/aci/packages/toolkit/bin/h5pro-component-macos',
      },
    },
    h5bundlePort: '3001',
  },
  webSimulator: {
    tarUrl: 'https://gw.alipayobjects.com/as/g/lyra/lyra-integration/6.1.27/lyra-web.tgz',
    storeDir: path.join(homeDir, '.dd-web-simulator-assets'),
    assetsPort: 8003,
    frameworkPort: 10003,
    proxyServerPort: 10005,
    targetH5Port: 3000,
    sdkCloudConfigPath: 'http://mt2.alibaba-inc.com/core/data/dataEntityMock.do?id=208906&t=1642127821581',
  },
};