import { ECommandName, ICommandConfigOpts, } from '../lib/common/types';
import config from '../lib/common/config';

/**
 * 命令配置，不包含action，便于在help命令下快速加载显示
 */
const commandsConfig: {
  [key in ECommandName]: ICommandConfigOpts;
} =  {
  [ECommandName.dev]: {
    command: {
      name: ECommandName.dev,
      description: '开发调试小程序、h5微应用和工作台组件，支持预览、上传、本地校验',
    },
    options: {
      targetH5Url: {
        description: '[可选] 在H5微应用场景下，用于指定本地调试的页面地址',
        type: 'string',
      },
      appId: {
        description: '[可选] 在小程序场景下，用于指定web模拟调试的appId',
        type: 'string',
      },
      page: {
        description: '[可选] 在小程序场景下，用于指定项目中web模拟调试的某一页面',
        type: 'string',
      },
    },
  },

  [ECommandName.init]: {
    command: {
      name: ECommandName.init,
      description: '创建一个钉钉应用，可以是小程序、h5、工作台组件',
    },
    options: {
      appType: {
        description: '[可选] 指定应用类型，值可以为miniprogram | h5 | plugin',
        type: 'string',
        shortcut: 'a',
      },
      template: {
        description: '[可选] 指定模板，模板的key可以从 https://github.com/open-dingtalk/dd-application-template 上查阅，如：plugin_default，则模板key为default',
        type: 'string',
        shortcut: 't',
      },
      language: {
        description: '[可选] 指定模板语言，值可以为javascript | typescript（有些模板可能没有typescript语言版本）',
        type: 'string',
        shortcut: 'l',
      },
      'skip-install': {
        description: '[可选] 若指定则不自动安装依赖',
        type: 'string',
      },
      outDir: {
        description: '[可选] 输出目录，若不指定时，将默认在当前目录新建',
        type: 'string',
        shortcut: 'o',
      },
    },
  },

  [ECommandName.lint]: {
    command: {
      name: ECommandName.lint,
      description: '校验钉钉小程序、h5、工作台组件的代码规范和平台要求规范',
    },
  },

  [ECommandName.preview]: {
    command: {
      name: ECommandName.preview,
      description: '生成二维码，扫码预览本地构建出来的小程序或工作台组件',
    },
    options: {
      miniAppId: {
        description: `[可选] 钉钉小程序或工作台组件的miniAppId。默认从当前工作目录下的 ${config.workspaceRcName} 中读取`,
        type: 'string',
      },
      token: {
        description: `[可选] API访问凭证，默认从当前工作目录下的 ${config.workspaceRcName} 中读取，生成方式参考 https://developers.dingtalk.com/document/app/used-to-obtain-the-application-authorization-without-api-token`,
        type: 'string',
      },
      debug: {
        description: '[可选] 生成真机调试二维码，可配合ChromeDevtools进行真机调试',
        type: 'boolean',
        shortcut: 'd',
      },
      page: {
        description: '[可选] 钉钉小程序或工作台组件预览时的页面配置。',
        type: 'string',
      },
      query: {
        description: '[可选] 钉钉小程序或工作台组件预览时的全局参数配置。',
        type: 'string',
      },
    },
  },

  [ECommandName.upload]: {
    command: {
      name: ECommandName.upload,
      description: '上传钉钉小程序或工作台组件',
    },
    options: {
      miniAppId: {
        description: `[可选] 钉钉小程序或工作台组件的miniAppId。默认从当前工作目录下的 ${config.workspaceRcName} 中读取`,
        type: 'string',
      },
      version: {
        description: `[可选] 本次上传版本号，格式为x.x.x，需要大于已上传的版本号。默认从当前工作目录下的 ${config.workspaceRcName} 中读取`,
        type: 'string',
      },
      token: {
        description: `[可选] API访问凭证，默认从当前工作目录下的 ${config.workspaceRcName} 中读取，生成方式参考 https://developers.dingtalk.com/document/app/used-to-obtain-the-application-authorization-without-api-token`,
        type: 'string',
      },
      override: {
        description: '[可选] 将miniAppId, token, version覆盖写入到ding.config.json',
        type: 'boolean',
      },
    },
  },

  [ECommandName.ngrok]: {
    command: {
      name: ECommandName.ngrok,
      description: '内网穿透之HTTP穿透',
    },
    options: {
      config: {
        description: '[可选] 内网穿透的配置文件，按照命令示例固定为钉钉提供的ding.cfg，无需修改，参考：https://github.com/open-dingtalk/dingtalk-pierced-client/blob/main/mac/ding.cfg',
        type: 'string',
      },
      subdomain: {
        description: '[可选] 您需要使用的域名前缀，该前缀将会匹配到“vaiwan.cn”前面，例如你的subdomain是abcde，启动工具后会将abc.vaiwan.cn映射到本地。',
        type: 'string',
      },
      port: {
        description: '[可选] 您需要代理的本地服务http-server端口，例如你本地端口为8080等',
        type: 'string',
      },
    },
  },
  [ECommandName.login]: {
    command: {
      name: ECommandName.login,
      description: '钉钉inside小程序登录',
    },
    options: {},
    needRegister: (options): boolean => {
      if (options.inside) return true;
      return false;
    },
  },
  [ECommandName.remoteDebug]: {
    command: {
      name: ECommandName.remoteDebug,
      description: '钉钉inside小程序真机调试',
    },
    options: {
      'auto-push': {
        description: '[可选] 自动推送到客户端, 默认打开, 使用 --no-auto-push 来关 (default: true)',
        type: 'boolean',
      },
      'ignore-http-domain-check': {
        description: '[可选] 忽略 http 请求白名单校验',
        type: 'boolean',
      },
      'ignore-webview-domain-check': {
        description: '[可选] 忽略 webview 加载域名白名单校验',
        type: 'boolean',
      },
      'app-id': {
        description: '[必填] 小程序应用 id',
        type: 'string',
        shortcut: 'a',
      },
      'client-type': {
        description: '[可选] 端类型',
        type: 'string',
        shortcut: 'c',
      },
      page: {
        description: '[可选] 入口页面',
        type: 'string',
      },
      'page-query': {
        description: '[可选] 页面参数, 可在当前页面的 onLoad 中取得，如: name=vendor&color=black',
        type: 'string',
      },
      query: {
        description: '[可选] 全局参数，app.js 的 onLaunch 中取得，如: name=vendor&color=black',
        type: 'string',
      },
      scene: {
        description: '[可选] 进入场景值',
        type: 'string',
      },
      'bundle-id': {
        description: '[可选] <高级> 开放平台 bundleId, 此项会覆盖 clientType 的效果',
        type: 'string',
      },
    },
    needRegister: (options): boolean => {
      if (options.inside) return true;
      return false;
    },
  },
  [ECommandName.previewInside]: {
    command: {
      name: ECommandName.previewInside,
      description: '钉钉inside小程序生成预览二维码',
    },
    options: {
      'auto-push': {
        description: '[可选] 自动推送到客户端, 默认打开, 使用 --no-auto-push 来关 (default: true)',
        type: 'boolean',
      },
      'ignore-http-domain-check': {
        description: '[可选] 忽略 http 请求白名单校验',
        type: 'boolean',
      },
      'ignore-webview-domain-check': {
        description: '[可选] 忽略 webview 加载域名白名单校验',
        type: 'boolean',
      },
      'app-id': {
        description: '[必填] 小程序应用 id',
        type: 'string',
        shortcut: 'a',
      },
      'client-type': {
        description: '[可选] 端类型',
        type: 'string',
        shortcut: 'c',
      },
      page: {
        description: '[可选] 入口页面',
        type: 'string',
      },
      'page-query': {
        description: '[可选] 页面参数, 可在当前页面的 onLoad 中取得，如: name=vendor&color=black',
        type: 'string',
      },
      query: {
        description: '[可选] 全局参数，app.js 的 onLaunch 中取得，如: name=vendor&color=black',
        type: 'string',
      },
      scene: {
        description: '[可选] 进入场景值',
        type: 'string',
      },
      'bundle-id': {
        description: '[可选] <高级> 开放平台 bundleId, 此项会覆盖 clientType 的效果',
        type: 'string',
      },
    },
    needRegister: (options): boolean => {
      if (options.inside) return true;
      return false;
    },
  },
};

export default commandsConfig;
