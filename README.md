# DingTalk Design CLI [![Build Status](https://circleci.com/gh/open-dingtalk/dingtalk-design-cli.svg?style=shield)](https://circleci.com/gh/open-dingtalk/dingtalk-design-cli/tree/develop)  [![Windows Build status](https://ci.appveyor.com/api/projects/status/hi7uu5rnbs4x9vas/branch/develop?svg=true)](https://ci.appveyor.com/project/lou1swu/dingtalk-design-cli/branch/develop) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

> DingTalk Design CLI 是面向钉钉开放平台小程序、h5微应用、工作台组件的研发命令行工具。提供对小程序、h5微应用、工作台组件的初始化、开发调试、本地校验、构建预览、上传等功能。
<br/>

## 安装
<br/>

> DingTalk Design CLI需要Nodejs版本不小于12.15.x. 你可以通过 [n](https://github.com/tj/n), [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)来管理本地多个Nodejs版本.

可以通过以下命令来安装 DingTalk Design CLI

```bash
npm install dingtalk-design-cli -g

# OR

yarn global add dingtalk-design-cli
```
安装后，你可以通过`ding`命令来使用 DingTalk Design CLI 的功能。
通过以下命令检测 DingTalk Design CLI 已经成功安装:
```bash
ding -v
```

通过以下命令查阅`ding`命令支持的功能：
```bash
ding -h
```

### 更新
如果你之前已经安装过 DingTalk Design CLI，可以通过以下命令进行升级:
```bash
npm update -g dingtalk-design-cli

# OR
yarn global upgrade --latest dingtalk-design-cli
```
## 快速入门
<br/>

首先，通过以下命令初始化一个本地项目:
```bash
ding init -o mpTest
```

1. 以小程序为例，选择应用类型为`小程序`:
![image](https://user-images.githubusercontent.com/27557494/123395738-2164c500-d5d3-11eb-81a8-d3f63c4edfc1.png)


2. 然后选择一个小程序模板`default`:
![image](https://user-images.githubusercontent.com/27557494/123396681-2d9d5200-d5d4-11eb-9f7e-2ae646d1b524.png)


3. 最后选择开发语言为`javascript`:
![image](https://user-images.githubusercontent.com/27557494/123396721-3aba4100-d5d4-11eb-9eb5-2b08f8c18157.png)


4. 到这里，你已经完成了所有初始化步骤，已经初始化了一个项目到`mpTest`目录下了
![image](https://user-images.githubusercontent.com/27557494/123396313-bff12600-d5d3-11eb-94c7-c6e907b4ba26.png)


5. 最后，进入`mpTest`项目目录，并执行`ding dev`就可以开启调试了
![image](https://user-images.githubusercontent.com/27557494/123396379-d303f600-d5d3-11eb-988b-baf46d652f3c.png)


## License

[MIT](https://github.com/open-dingtalk/dingtalk-design-cli/blob/develop/LICENSE)
