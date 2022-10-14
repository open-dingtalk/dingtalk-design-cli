# `dingtalk-h5package-opensdk`

> H5离线包OpenSDK


## 安装

```

npm install dingtalk-h5package-opensdk --save-dev

```

## 用法


### 命令行用法

```javascript

// 企业自建应用
npx h5package inner --id <企业自建应用agentId> --accesstoken <企业apiToken> --dir ./dist

// 第三方企业应用
npx h5package provider --id <第三方企业应用appId> --accesstoken <企业apiToken> --dir ./dist


```


### 脚本用法

```javascript
import { sdk } from 'dingtalk-h5package-opensdk';

// 初始化参数
sdk.setConfig({
  accessToken: '从开放平台获取的apiToken',
});

// 创建H5离线包
const { version } = await sdk.createPackage({
  // 应用的ID，二选一即可。
  appId: '第三方企业应用appId',
  agentId: '企业内部agentId',
  input: 'H5离线包资源所在的目录地址', // 在此目录下的所有文件会作为H5离线包的静态资源，压缩上传并创建H5离线包
});

// H5离线包发布上线
await sdk.publishPackage({
  // 设置应用的ID，二选一即可。
  appId: '第三方企业应用appId',
  agentId: '企业内部agentId',
  version: version, // 需要发布的离线包的版本号，如0.0.1。
});

```
