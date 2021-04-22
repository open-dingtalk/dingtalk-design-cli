import * as os from 'os';
import * as path from 'path';

export default {
  generatorNamespace: 'dd-application:app',
  h5bundle: {
    bin: {
      windows: 'https://aci-store.cn-hangzhou-alipay-b.oss-cdn.aliyun-inc.com/aci/aci-artifacts-20210402165651-55d67c44-943b-4eba-ac2b-2ebcca80ef38/packages/toolkit/bin/h5pro-component-win.exe.tar.gz',
      linux: 'https://aci-store.cn-hangzhou-alipay-b.oss-cdn.aliyun-inc.com/aci/aci-artifacts-20210402165651-55d67c44-943b-4eba-ac2b-2ebcca80ef38/packages/toolkit/bin/h5pro-component-linux.tar.gz',
      mac: 'https://aci-store.cn-hangzhou-alipay-b.oss-cdn.aliyun-inc.com/aci/aci-artifacts-20210402165651-55d67c44-943b-4eba-ac2b-2ebcca80ef38/packages/toolkit/bin/h5pro-component-macos.tar.gz',
    },
    storeDir: path.join(os.homedir(), '.dd-h5bundle-bin'),
  },
};