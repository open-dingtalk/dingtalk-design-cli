# `dingtalk-h5package-opensdk`

> H5离线包OpenSDK


## 安装

```

npm install dingtalk-h5package-opensdk --save-dev

```


## 快速开始
<br />

1\. 在项目中安装打包OpenSDK

```bash

npm install dingtalk-h5package-opensdk --save-dev

```
<br />

2\. 在项目根目录下创建离线包资源配置文件 ```localresource.json```，声明离线包ID、[开放平台网关ApiToken](https://open.dingtalk.com/document/orgapp-server/used-to-obtain-the-application-authorization-without-api-token)

```js
// localresource.json
{
  "miniAppId": "离线包ID",
  "accessToken": "开放平台网关ApiToken"
}
```

3\. 在 ```localresource.json``` 中添加 ```assets``` 配置，声明项目中静态资源（编译产物、静态资源皆可）与线上资源的映射关系。

示例：

```js
{
  // key为应用的URL路径地址，值为本地文件或目录
  "assets: {
    // 目录
    "https://www.example.com/myapp": "./dist"，
    // 文件
    "https://www.example.com/myapp/hello.html": "./dist/hello.html"
  },
}
```

<br />

 4\. 在 ```localresource.json``` 中添加 ```externalAssets``` 配置，声明应用中依赖的外部资源（如 react、 react-dom等）。

```js
{
  "externalAssets": [
    "https://unpkg.com/react@16.7.0/umd/react.production.min.js"
  ]
}

```

5. 在项目package.json中声明打包上传离线包命令：
<br />


```json
{
  "scripts": {
    "create-h5package": "npx h5package packAndDeploy"
  }
}
```


5. 上传离线包

```bash
npm run create-h5pacakge
```


## 命令列表


### pack

本地离线包资源打包，在本地输出打包后的离线资源文件，文件格式为.tar.gz。离线包ID自动在 ```localresource.json``` 文件中查找。

用法：

```bash

npx h5package pack

```

### deploy

将指定版本的H5离线包发布到线上。离线包ID和accessToken自动在 ```localresource.json``` 文件中查找。

用法:
```bash

npx h5package deploy <version>

```


### packAndDeploy

打包离线包资源，上传并发布到线上。离线包ID和打包配置自动在 ```localresource.json``` 文件中查找。

```bash

npx h5package packAndDeploy

```



<br />

### 打包配置文件 Config

```typescript
{
  // 离线包ID
  miniAppId: string;
  // 访问凭证API TOKEN。上传请求开放平台网关时需要。
  accessToken: string;
  // 线上资源URL和本地文件、目录映射关系。key 为线上资源URL地址，值 为本地文件地址。支持 文件 和 目录
  // 示例：
  // {
  //   assets: {
  //     键值为目录。将 ./dist 目录下的资源添加到 https://www.example.com/myapp 下
  //     "https://www.example.com/myapp": "./dist",
  //     键值为文件。将  ./favorite.icon 添加到  https://www.example.com/myapp/favorite.ico
  //     "https://www.example.com/myapp/favorite.ico": "./favorite.ico",
  //   }
  // }
  assets: Record<string, string>;
  // 依赖的外部URL列表。
  // 应用中往往会依赖一些外部资源，如react、vue等外部公共库CDN资源。
  // 添加到此配置后，打包脚本会自动通过HTTP GET请求从网络下载资源内容进行打包。
  // 示例：
  // {
  //   "externalAssets": [
  //     "https://unpkg.com/react@16.7.0/umd/react.production.min.js",
  //     "https://unpkg.com/vue@3.2.45/dist/vue.global.js",
  //     "https://unpkg.com/jquery@3.6.1/dist/jquery.js"
  //   ]
  // }
  externalAssets: string[];
}
```
