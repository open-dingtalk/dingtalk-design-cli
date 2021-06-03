"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = require("yeoman-generator");
const timeInspector_1 = require("../utils/timeInspector");
const errors_1 = require("@common/errors");
const path = require("path");
const logger_1 = require("../utils/logger");
const simple_git_1 = require("simple-git");
const config_1 = require("@common/config");
const fs = require("fs");
const isValidRepoDirectory_1 = require("../utils/isValidRepoDirectory");
const git = simple_git_1.default();
module.exports = class CustomGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.answers = {};
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
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.options;
            if (options.appType) {
                this.log(logger_1.info(`You have selected appType: ${options.appType}`, true));
            }
            if (options.template) {
                this.log(logger_1.info(`You have selected template: ${options.template}`, true));
            }
            if (options.language) {
                this.log(logger_1.info(`You have selected language: ${options.language}`, true));
            }
            /**
             * choose appType
             */
            const { appType, } = yield this.prompt([
                // 选择应用类型
                {
                    type: 'list',
                    name: 'appType',
                    message: 'Choose a appType to create',
                    choices: config_1.HUBS_CONFIG.map(v => ({
                        name: v.name || v.key,
                        value: v.key,
                    })),
                    default: config_1.HUBS_CONFIG[0].key,
                    when: !options.appType,
                },
            ]);
            const selectedHub = config_1.HUBS_CONFIG.find(v => v.key === appType);
            if (!selectedHub) {
                this.log(logger_1.error(errors_1.ERROR_APP_TYPE_NOT_FOUND, true));
                return this.env.error(new Error(errors_1.ERROR_APP_TYPE_NOT_FOUND));
            }
            const repoLocalPath = path.join(config_1.REPO_LOCAL_ROOT_PATH, appType);
            if (fs.existsSync(repoLocalPath)) {
                try {
                    const res = yield git
                        .outputHandler((bin, stdout, stderr, args) => {
                        stdout.pipe(process.stdout);
                        stderr.pipe(process.stderr);
                    })
                        .env(Object.assign({}, process.env))
                        .cwd(repoLocalPath)
                        .pull();
                    this.log(logger_1.done(res.files.length > 0 ? 'Demo repo update success.' : 'Demo repo is already up-to-date', true));
                }
                catch (e) {
                    console.error(e);
                    this.log(logger_1.error('Demo repo update fail.', true));
                    return this.env.error(e);
                }
            }
            else {
                try {
                    const opts = {
                        logger: this.log.bind(this),
                        fetchingTips: 'Fetching demo from git, please wait for a minute...',
                        timeoutTips: 'Fetching failed. Please check the network.',
                        internal: 10 * 1000,
                    };
                    yield timeInspector_1.default(() => __awaiter(this, void 0, void 0, function* () {
                        yield git
                            .outputHandler((bin, stdout, stderr, args) => {
                            stdout.pipe(process.stdout);
                            stderr.pipe(process.stderr);
                        })
                            .env(Object.assign({}, process.env))
                            .clone(selectedHub.repoRemotePath, repoLocalPath);
                    }), opts);
                    this.log(logger_1.done('Demo repo download success.', true));
                }
                catch (e) {
                    console.error(e);
                    this.log(logger_1.error('Demo repo clone fail.', true));
                    return this.env.error(e);
                }
            }
            let templateList = [];
            try {
                const originTemplateList = fs.readdirSync(repoLocalPath, {
                    withFileTypes: true,
                });
                const sliceIdx = `${appType}${config_1.DEFAULT_DIRECTORY_SEPERATOR}`.length;
                // filter file which is not seen,
                // 1. get Directory and filter hidden files
                // 2. get Directory which starts with appType
                templateList = originTemplateList.filter(v => v.isDirectory() && isValidRepoDirectory_1.default(v.name, appType)).map(v => ({
                    name: v.name.slice(sliceIdx),
                    value: v.name,
                }));
                logger_1.debug(`originTemplateList: ${JSON.stringify(originTemplateList)}. templateList: ${JSON.stringify(templateList)}`);
                if (templateList.length === 0) {
                    this.log(logger_1.error(`The directory name must start with ${appType}`, true));
                    throw errors_1.ERROR_REPO_IS_EMPTY;
                }
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
                this.log(logger_1.error(errors_1.ERROR_REPO_NOT_VALID, true));
                return this.env.error(e);
            }
            /**
             * choose template
             */
            const { template, } = yield this.prompt([
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
            ]);
            let languageList = [];
            try {
                languageList = fs.readdirSync(path.join(repoLocalPath, template), {
                    withFileTypes: true,
                });
                // filter file which is not seen
                languageList = languageList.filter(v => v.isDirectory() && !v.name.startsWith('.')).map(v => ({
                    name: v.name,
                }));
                logger_1.debug(`languageList: ${JSON.stringify(languageList)}`);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
                this.log(logger_1.error('Demo repo is not valid.', true));
                return this.env.error(e);
            }
            /**
             * choose language
             */
            const { language, } = yield this.prompt([
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
            ]);
            this.answers = {
                outDir: this.answers.outDir,
                appType: options.appType || appType,
                template: options.template || template,
                language: options.language || language,
            };
        });
    }
    // copy
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { template, language, appType, } = this.answers;
            logger_1.debug(`writing: ${this.outDir}-${appType}-${template}-${language}`);
            let targetDir = path.join(this.contextRoot, this.outDir);
            try {
                if (fs.existsSync(targetDir) && this.outDir) {
                    const answers = yield this.prompt([{
                            type: 'confirm',
                            name: 'override',
                            message: `${targetDir} is exist, would you override the directory?`,
                        }]);
                    logger_1.debug(`writing: canOverride ${answers.override}`);
                    if (answers.override) {
                        fs.rmdirSync(targetDir, {
                            recursive: true,
                        });
                    }
                    else {
                        // retype outDir
                        const answers = yield this.prompt([{
                                type: 'input',
                                name: 'outDir',
                                message: 'Retype where to create the project',
                            }]);
                        this.outDir = answers.outDir;
                        targetDir = path.join(this.contextRoot, this.outDir);
                    }
                }
            }
            catch (e) {
                this.log(logger_1.error(e.toString(), true));
                return this.env.error(e);
            }
            const demoPath = path.join(config_1.REPO_LOCAL_ROOT_PATH, appType, template, language);
            if (fs.existsSync(demoPath)) {
                try {
                    this.copyDestination(demoPath, targetDir);
                }
                catch (e) {
                    this.log(logger_1.error('Demo repo copy failed.' + JSON.stringify(e), true));
                    return this.env.error(new Error(errors_1.ERROR_DEMO_COPY));
                }
            }
            else {
                return this.env.error(new Error(errors_1.ERROR_REPO_NOT_FOUND));
            }
            this.log(logger_1.done('Demo repo copy success.', true));
        });
    }
    // npm install
    install() {
        const outDir = this.outDir;
        const outDirPath = path.join(this.contextRoot, outDir);
        const pkgJsonPath = path.join(outDirPath, 'package.json');
        const skipInstall = this.options['skip-install'];
        if (fs.existsSync(pkgJsonPath) && !skipInstall) {
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
        this.log(logger_1.done(`Congratulations! Your project has been initialated at ${wd}. You can run \`npm run start\` at this directory.`, true));
    }
};
