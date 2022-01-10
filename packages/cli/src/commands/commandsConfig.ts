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
        description: '[可选] 指定模版，模版的key可以从 https://github.com/open-dingtalk/dd-application-template 上查阅，如：plugin_default，则模版key为default',
        type: 'string',
        shortcut: 't',
      },
      language: {
        description: '[可选] 指定模版语言，值可以为javascript | typescript（有些模版可能没有typescript语言版本）',
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
    },
  },
};

export default commandsConfig;