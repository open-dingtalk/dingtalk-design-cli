import Generator from 'yeoman-generator';
import timeInspector from '../utils/timeInspector';
import {
  ERROR_REPO_NOT_FOUND,
  ERROR_DEMO_COPY,
  ERROR_APP_TYPE_NOT_FOUND,
  ERROR_REPO_NOT_VALID,
  ERROR_REPO_IS_EMPTY,
} from '@common/errors';
import * as path from 'path';
import { error, done, debug, info, } from '../utils/logger';
import simpleGit from 'simple-git';
import { HUBS_CONFIG, REPO_LOCAL_ROOT_PATH, DEFAULT_DIRECTORY_SEPERATOR,  } from '@common/config';
import isValidDirectory from '../utils/isValidRepoDirectory';
import fs, { mkdirp, } from 'fs-extra';
import getJson from '../utils/getJson';

const git = simpleGit();

interface IArguments {
  // 导出的目标文件夹
  outDir?: string;
}

interface IOptions {
  'force-update-repo'?: string;
  'skip-install'?: string;
  // 模版种类
  appType: string;
  // 模版名称
  template: string;
  // js/ts
  language: string;
}

interface Answers {
  // 输出目录
  outDir: string;
  // 模版种类
  appType: string;
  // 模版名称
  template: string;
  // js/ts
  language: string;
}

module.exports = class CustomGenerator extends Generator<IOptions> {
  answers = {} as Answers;
  outDir: string;

  constructor(args: string| string[], opts: IOptions) {
    super(args, opts);

    this.argument('outDir', { type: String, required: false, description: 'If no typing outDir, generator would initialize the project in the current workspace', default: './', });
    this.option('force-update-repo', { type: Boolean, description: 'Need to forcely update the demo repo', default: false, });
    this.option('skip-install', { type: Boolean, description: 'Skip install the dependencies', default: false, });
    this.option('appType', { type: String, description: 'Choose a appType to create', default: '', });
    this.option('template', { type: String, description: 'Choose a template to create', default: '', });
    this.option('language', { type: String, description: 'Choose a language to create', default: '', });
   
    // @ts-ignore
    this.outDir = this.args[0] || './';
  }
  // main workflow
  async prompting() {
    const options = this.options;
    if(options.appType) {
      this.log(info(`已经选择了应用类型: ${options.appType}`, true));
    }
    if(options.template) {
      this.log(info(`已经选择了模版: ${options.template}`, true));
    }
    if(options.language) {
      this.log(info(`已经选择了开发语言: ${options.language}`, true));
    }

    /**
     * choose appType
     */
    const { appType, } = await this.prompt([
      // 选择应用类型
      { 
        type: 'list',
        name: 'appType',
        message: '选择应用类型',
        choices: HUBS_CONFIG.map(v=>({
          name: v.name || v.key,
          value: v.key,
        })),
        default: HUBS_CONFIG[0].key,
        when: !options.appType,
      },
    ]) as Answers;

    const selectedHub = HUBS_CONFIG.find(v=>v.key === appType);
    if(!selectedHub) {
      this.log(error(ERROR_APP_TYPE_NOT_FOUND, true));
      return this.env.error(new Error(ERROR_APP_TYPE_NOT_FOUND));
    }

    const repoLocalPath = path.join(REPO_LOCAL_ROOT_PATH, appType);
    if (fs.existsSync(repoLocalPath)) {
      fs.rmdirSync(repoLocalPath, {
        recursive: true,
      });
    }

    try {
      const opts = {
        logger: this.log.bind(this),
        fetchingTips: '正在拉取最新模版，请稍后',
        timeoutTips: '拉取失败，请检测网络情况',
        internal: 10 * 1000,
      };
      await timeInspector(async ()=>{
        await git
          .outputHandler((bin, stdout, stderr, args, )=>{
            stdout.pipe(process.stdout);
            stderr.pipe(process.stderr);
          })
          .env({ ...process.env, })
          .clone(selectedHub.repoRemotePath, repoLocalPath);
      }, opts);
      this.log(done('模版仓库已成功下载', true));
    } catch(e) {
      console.error(e);
      this.log(error('模版仓库下载失败', true));
      return this.env.error(e);
    }
    
    let templateList = [];
    try {
      const originTemplateList = fs.readdirSync(repoLocalPath, {
        withFileTypes: true,
      });
      const sliceIdx = `${appType}${DEFAULT_DIRECTORY_SEPERATOR}`.length;
      // filter file which is not seen,
      // 1. get Directory and filter hidden files
      // 2. get Directory which starts with appType
      templateList = originTemplateList.filter(v=>v.isDirectory() && isValidDirectory(v.name, appType)).map(v=>{
        const templatePath = path.join(repoLocalPath, v.name, 'config.json');
        const configJson = getJson(templatePath, true, {});
        return {
          name: `${v.name.slice(sliceIdx)} ${configJson.description ? `- ${configJson.description}` : ''}`,
          value: v.name,
        };
      });
      debug(`originTemplateList: ${JSON.stringify(originTemplateList)}. templateList: ${JSON.stringify(templateList)}`);

      if(templateList.length === 0) {
        this.log(error(`模版仓库中，每个模版名必须以 ${appType} 开头`, true));
        throw ERROR_REPO_IS_EMPTY;
      }
    } catch(e) {
      if(e instanceof Error) {
        console.error(e.message);
      }
      this.log(error(ERROR_REPO_NOT_VALID, true));
      return this.env.error(e);
    }

    /**
     * choose template
     */
    const { template, } = await this.prompt([
      // 选择应用类型
      { 
        type: 'list',
        name: 'template',
        message: '选择模版',
        choices: templateList,
        default: templateList[0].name,
        store: true,
        when: !options.template,
      },
    ]) as Answers;

    let languageList = [];
    try {
      languageList = fs.readdirSync(path.join(repoLocalPath, template), {
        withFileTypes: true,
      });
      // filter file which is not seen
      languageList = languageList.filter(v=>v.isDirectory() && !v.name.startsWith('.')).map(v=>({
        name: v.name,
      }));
      debug(`languageList: ${JSON.stringify(languageList)}`);
    } catch(e) {
      if(e instanceof Error) {
        console.error(e.message);
      }
      this.log(error('模版仓库非法', true));
      return this.env.error(e);
    }

    /**
     * choose language
     */
    const { language, } = await this.prompt([
      // 选择应用类型
      { 
        type: 'list',
        name: 'language',
        message: '选择开发语言',
        choices: languageList,
        default: languageList[0].name,
        store: true,
        when: !options.language,
      },
    ]) as Answers;

    this.answers = {
      outDir: this.answers.outDir,
      appType: options.appType || appType,
      template: options.template || template,
      language: options.language || language,
    };
  }
  // copy
  async writing() {
    const {
      template,
      language,
      appType,
    } = this.answers;
    debug(`writing: ${this.outDir}-${appType}-${template}-${language}`);

    let targetDir = path.join(this.contextRoot, this.outDir);

    try {
      await mkdirp(targetDir);
    } catch(e) {
      console.error(e);
      this.log(error(e.message, true));
      return this.env.error(e);
    }

    const files = fs.readdirSync(targetDir, {
      encoding: 'utf-8',
    });
    try {
      if(files.length > 0 && this.outDir) {
        const answers = await this.prompt([{
          type: 'confirm',
          name: 'override',
          message: `${targetDir} 已存在，是否需要覆盖?`,
        }]);
        debug(`writing: canOverride ${answers.override}`);
        if(answers.override) {
          fs.emptyDirSync(targetDir);
        } else {
          // retype outDir
          const answers = await this.prompt([{
            type: 'input',
            name: 'outDir',
            message: '重新选择初始化的目录',
          }]);
          this.outDir = answers.outDir;
          targetDir = path.join(this.contextRoot, this.outDir);
        }
      }
    } catch(e) {
      this.log(error(e.toString(), true));
      return this.env.error(e);
    }

    const demoPath = path.join(REPO_LOCAL_ROOT_PATH, appType, template, language);
    if(fs.existsSync(demoPath)) {
      try {
        this.copyDestination(demoPath, targetDir, {
          globOptions: {
            dot: true,
          },
        });
      } catch(e) {
        this.log(error('模版复制失败' + JSON.stringify(e), true));
        return this.env.error(new Error(ERROR_DEMO_COPY));
      }
    } else {
      return this.env.error(new Error(ERROR_REPO_NOT_FOUND));
    }

    this.log(done('模版复制成功', true));
  }
  // npm install
  install() {
    const outDir = this.outDir;
    const outDirPath = path.join(this.contextRoot, outDir);
    const pkgJsonPath = path.join(outDirPath, 'package.json');
    const skipInstall = this.options['skip-install'];
    if(fs.existsSync(pkgJsonPath) && !skipInstall) {
      process.chdir(outDirPath);
      this.installDependencies({
        npm: true,
        yarn: false,
        bower: false,
      });
    }
  }
  // say good bye
  end() {
    const outDir = this.outDir;
    const wd = path.join(this.contextRoot, outDir);
    this.log(done(`你的项目已经初始化到目录 ${wd} 下。`, true));
  }
};