import * as os from 'os';
import * as path from 'path';
import { APP_TYPE_ENUM, } from './constants'; 

// 配置文件
export const RC_PATH = path.join(os.homedir(), '.dd-cli-rc.json');
// 本地缓存
export const REPO_LOCAL_ROOT_PATH = path.join(os.homedir(), '.dd-demo-repo');
// 代码仓库目录名分隔符，合格的目录名格式: ${appType}${seperator}${desc}
export const DEFAULT_DIRECTORY_SEPERATOR = '_';

interface HUB {
  /**
   * 套件名称
   * 用于问询环节以及模版配置文件中
   */
  name: string;

  /**
   * 套件的代码仓库地址
   * git ssh
   * 仓库的层级为template->language，必须要严格按照此标准
   */
  repoRemotePath: string;
  
  /**
   * 套件描述
   */
  desc?: string;

  /**
   * @todo
   * 扩展命令
   * 由dde承载
   */
  commands?: [];

  /**
   * @todo
   * init结束后的句柄
   */
  postInit?: Promise<void>;
}

// 套件配置
export const HUBS_CONFIG: HUB[] = [
  {
    name: APP_TYPE_ENUM.PLUGIN,
    repoRemotePath: 'https://github.com/open-dingtalk/dd-application-template.git',
  }
];