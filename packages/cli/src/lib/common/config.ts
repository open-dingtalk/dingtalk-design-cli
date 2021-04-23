import * as os from 'os';
import * as path from 'path';

const homeDir = os.homedir();

export default {
  generatorNamespace: 'dd-application:app',
  rcPath: path.join(homeDir, '.ddrc'),
  h5pro: {
    storeDir: path.join(homeDir, '.dd-h5bundle-bin'),
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