import * as Generator from 'yeoman-generator';
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
import * as fs from 'fs';
import isValidDirectory from '../utils/isValidRepoDirectory';

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

    this.argument('outDir', { type: String, required: false, description: 'If no typing outDir, generator would initialize the project in the current workspace', default: '', });
    this.option('force-update-repo', { type: Boolean, description: 'Need to forcely update the demo repo', default: false, });
    this.option('skip-install', { type: Boolean, description: 'Skip install the dependencies', default: false, });
    this.option('appType', { type: String, description: 'Choose a appType to create', default: '', });
    this.option('template', { type: String, description: 'Choose a template to create', default: '', });
    this.option('language', { type: String, description: 'Choose a language to create', default: '', });
   
    // @ts-ignore
    this.outDir = this.args[0] || '';
  }
  // main workflow
  async prompting() {
    const options = this.options;
    if(options.appType) {
      this.log(info(`You have selected appType: ${options.appType}`, true));
    }
    if(options.template) {
      this.log(info(`You have selected template: ${options.template}`, true));
    }
    if(options.language) {
      this.log(info(`You have selected language: ${options.language}`, true));
    }

    /**
     * choose appType
     */
    const { appType, } = await this.prompt([
      // 选择应用类型
      { 
        type: 'list',
        name: 'appType',
        message: 'Choose a appType to create',
        choices: HUBS_CONFIG.map(v=>({
          name: v.name,
        })),
        default: HUBS_CONFIG[0].name,
        store: true,
        when: !options.appType,
      },
    ]) as Answers;

    const selectedHub = HUBS_CONFIG.find(v=>v.name === appType);
    if(!selectedHub) {
      this.log(error(ERROR_APP_TYPE_NOT_FOUND, true));
      return this.env.error(new Error(ERROR_APP_TYPE_NOT_FOUND));
    }

    const repoLocalPath = path.join(REPO_LOCAL_ROOT_PATH, appType);
    if(fs.existsSync(repoLocalPath)) {
      try {
        const res = await git.cwd(repoLocalPath).pull();
        this.log(done(res.files.length > 0 ? 'Demo repo update success.' : 'Demo repo is already up-to-date', true));
      } catch(e) {
        if(e instanceof Error) {
          console.error(e.message);
        }
        this.log(error('Demo repo update fail.', true));
        return this.env.error(e);
      }
    } else {
      try {
        const opts = {
          logger: this.log.bind(this),
          fetchingTips: 'Fetching demo from git, please wait for a minute...',
          timeoutTips: 'Fetching failed. Please check the network.',
          internal: 10 * 1000,
        };
        await timeInspector(async ()=>{
          await git.clone(selectedHub.repoRemotePath, repoLocalPath);
        }, opts);
        this.log(done('Demo repo download success.', true));
      } catch(e) {
        if(e instanceof Error) {
          console.error(e.message);
        }
        this.log(error('Demo repo clone fail.', true));
        return this.env.error(e);
      }
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
      templateList = originTemplateList.filter(v=>v.isDirectory() && isValidDirectory(v.name, appType)).map(v=>({
        name: v.name.slice(sliceIdx),
        value: v.name,
      }));
      debug(`originTemplateList: ${JSON.stringify(originTemplateList)}. templateList: ${JSON.stringify(templateList)}`);

      if(templateList.length ===0) {
        this.log(error(`The directory name must start with ${appType}`, true));
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
        message: 'Choose a template',
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
      this.log(error('Demo repo is not valid.', true));
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
        message: 'Choose a language you like',
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
      if(fs.existsSync(targetDir) && this.outDir) {
        const answers = await this.prompt([{
          type: 'confirm',
          name: 'override',
          message: `${targetDir} is exist, would you override the directory?`,
        }]);
        debug(`writing: canOverride ${answers.override}`);
        if(answers.override) {
          fs.rmdirSync(targetDir, {
            recursive: true,
          });
        } else {
          // retype outDir
          const answers = await this.prompt([{
            type: 'input',
            name: 'outDir',
            message: 'Retype where to create the project',
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
        this.copyDestination(demoPath, targetDir);
      } catch(e) {
        this.log(error('Demo repo copy failed.' + JSON.stringify(e), true));
        return this.env.error(new Error(ERROR_DEMO_COPY));
      }
    } else {
      return this.env.error(new Error(ERROR_REPO_NOT_FOUND));
    }

    this.log(done('Demo repo copy success.', true));
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
    this.log(done(`Congratulations! Your project has been initialated at ${wd}. You can run \`npm run start\` at this directory.`, true));
  }
};