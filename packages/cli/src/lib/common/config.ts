import * as os from 'os';
import * as path from 'path';

const homeDir = os.homedir();

export default {
  generatorNamespace: 'dd-application:app',
  workspaceRc: 'dtd.config.json', // IWorkspaceRc
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
      linux: {
        binDownloadUrl: 'https://aci-store.cn-hangzhou-alipay-b.oss-cdn.aliyun-inc.com/aci/aci-artifacts-20210402165651-55d67c44-943b-4eba-ac2b-2ebcca80ef38/packages/toolkit/bin/h5pro-component-linux.tar.gz',
        binExtractPath: '',
      },
    },
  },
};