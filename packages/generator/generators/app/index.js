"use strict";
var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () {return m[k];} });
} : function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function (o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {return value instanceof P ? value : new P(function (resolve) {resolve(value);});}
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {try {step(generator.next(value));} catch (e) {reject(e);}}
        function rejected(value) {try {step(generator["throw"](value));} catch (e) {reject(e);}}
        function step(result) {result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);}
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const timeInspector_1 = __importDefault(require("../utils/timeInspector"));
const errors_1 = require("../common/errors");
const path = __importStar(require("path"));
const logger_1 = require("../utils/logger");
const simple_git_1 = __importDefault(require("simple-git"));
const config_1 = require("../common/config");
const isValidRepoDirectory_1 = __importDefault(require("../utils/isValidRepoDirectory"));
const fs_extra_1 = __importStar(require("fs-extra"));
const getJson_1 = __importDefault(require("../utils/getJson"));
const git = (0, simple_git_1.default)();
module.exports = class CustomGenerator extends yeoman_generator_1.default {
    constructor(args, opts) {
        super(args, opts);
        this.answers = {};
        this.argument('outDir', { type: String, required: false, description: 'If no typing outDir, generator would initialize the project in the current workspace', default: './' });
        this.option('force-update-repo', { type: Boolean, description: 'Need to forcely update the demo repo', default: false });
        this.option('skip-install', { type: Boolean, description: 'Skip install the dependencies', default: false });
        this.option('appType', { type: String, description: 'Choose a appType to create', default: '' });
        this.option('template', { type: String, description: 'Choose a template to create', default: '' });
        this.option('language', { type: String, description: 'Choose a language to create', default: '' });
        // @ts-ignore
        this.outDir = this.args[0] || './';
    }
    // main workflow
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.options;
            if (options.appType) {
                this.log((0, logger_1.info)(`已经选择了应用类型: ${options.appType}`, true));
            }
            if (options.template) {
                this.log((0, logger_1.info)(`已经选择了模版: ${options.template}`, true));
            }
            if (options.language) {
                this.log((0, logger_1.info)(`已经选择了开发语言: ${options.language}`, true));
            }
            /**
               * choose appType
               */
            let { appType } = yield this.prompt([
            // 选择应用类型
            {
                type: 'list',
                name: 'appType',
                message: '选择应用类型',
                choices: config_1.HUBS_CONFIG.map(v => ({
                    name: v.name || v.key,
                    value: v.key })),

                default: config_1.HUBS_CONFIG[0].key,
                when: !options.appType }]);


            appType = appType || options.appType;
            const selectedHub = config_1.HUBS_CONFIG.find(v => v.key === appType);
            if (!selectedHub) {
                this.log((0, logger_1.error)(errors_1.ERROR_APP_TYPE_NOT_FOUND, true));
                return this.env.error(new Error(errors_1.ERROR_APP_TYPE_NOT_FOUND));
            }
            const repoLocalPath = path.join(config_1.REPO_LOCAL_ROOT_PATH, appType);
            if (fs_extra_1.default.existsSync(repoLocalPath)) {
                fs_extra_1.default.rmdirSync(repoLocalPath, {
                    recursive: true });

            }
            try {
                const opts = {
                    logger: this.log.bind(this),
                    fetchingTips: '正在拉取最新模版，请稍后',
                    timeoutTips: '拉取失败，请检测网络情况',
                    internal: 10 * 1000 };

                yield (0, timeInspector_1.default)(() => __awaiter(this, void 0, void 0, function* () {
                    yield git.
                    outputHandler((bin, stdout, stderr, args) => {
                        stdout.pipe(process.stdout);
                        stderr.pipe(process.stderr);
                    }).
                    env(Object.assign({}, process.env)).
                    clone(selectedHub.repoRemotePath, repoLocalPath);
                }), opts);
                this.log((0, logger_1.done)('模版仓库已成功下载', true));
            }
            catch (e) {
                console.error(e);
                this.log((0, logger_1.error)('模版仓库下载失败', true));
                return this.env.error(e);
            }
            let templateList = [];
            try {
                const originTemplateList = fs_extra_1.default.readdirSync(repoLocalPath, {
                    withFileTypes: true });

                const sliceIdx = `${appType}${config_1.DEFAULT_DIRECTORY_SEPERATOR}`.length;
                // filter file which is not seen,
                // 1. get Directory and filter hidden files
                // 2. get Directory which starts with appType
                templateList = originTemplateList.filter(v => v.isDirectory() && (0, isValidRepoDirectory_1.default)(v.name, appType)).map(v => {
                    const templatePath = path.join(repoLocalPath, v.name, 'config.json');
                    const configJson = (0, getJson_1.default)(templatePath, true, {});
                    return {
                        name: `${v.name.slice(sliceIdx)} ${configJson.description ? `- ${configJson.description}` : ''}`,
                        value: v.name };

                });
                (0, logger_1.debug)(`originTemplateList: ${JSON.stringify(originTemplateList)}. templateList: ${JSON.stringify(templateList)}`);
                if (templateList.length === 0) {
                    this.log((0, logger_1.error)(`模版仓库中，每个模版名必须以 ${appType} 开头`, true));
                    throw errors_1.ERROR_REPO_IS_EMPTY;
                }
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
                this.log((0, logger_1.error)(errors_1.ERROR_REPO_NOT_VALID, true));
                return this.env.error(e);
            }
            /**
               * choose template
               */
            let { template } = yield this.prompt([
            // 选择应用类型
            {
                type: 'list',
                name: 'template',
                message: '选择模版',
                choices: templateList,
                default: templateList[0].name,
                store: true,
                when: !options.template }]);


            template = options.template || template;
            let languageList = [];
            try {
                languageList = fs_extra_1.default.readdirSync(path.join(repoLocalPath, template), {
                    withFileTypes: true });

                // filter file which is not seen
                languageList = languageList.filter(v => v.isDirectory() && !v.name.startsWith('.')).map(v => ({
                    name: v.name }));

                (0, logger_1.debug)(`languageList: ${JSON.stringify(languageList)}`);
            }
            catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }
                this.log((0, logger_1.error)('模版仓库非法', true));
                return this.env.error(e);
            }
            /**
               * choose language
               */
            let { language } = yield this.prompt([
            // 选择应用类型
            {
                type: 'list',
                name: 'language',
                message: '选择开发语言',
                choices: languageList,
                default: languageList[0].name,
                store: true,
                when: !options.language }]);


            language = options.language || language;
            this.answers = {
                outDir: this.answers.outDir,
                appType: options.appType || appType,
                template: options.template || template,
                language: options.language || language };

        });
    }
    // copy
    writing() {
        return __awaiter(this, void 0, void 0, function* () {
            const { template, language, appType } = this.answers;
            (0, logger_1.debug)(`writing: ${this.outDir}-${appType}-${template}-${language}`);
            let targetDir = path.join(this.contextRoot, this.outDir);
            try {
                yield (0, fs_extra_1.mkdirp)(targetDir);
            }
            catch (e) {
                console.error(e);
                this.log((0, logger_1.error)(e.message, true));
                return this.env.error(e);
            }
            const files = fs_extra_1.default.readdirSync(targetDir, {
                encoding: 'utf-8' });

            try {
                if (files.length > 0 && this.outDir) {
                    const answers = yield this.prompt([{
                        type: 'confirm',
                        name: 'override',
                        message: `${targetDir} 已存在，是否需要覆盖?` }]);

                    (0, logger_1.debug)(`writing: canOverride ${answers.override}`);
                    if (answers.override) {
                        fs_extra_1.default.emptyDirSync(targetDir);
                    } else
                    {
                        // retype outDir
                        const answers = yield this.prompt([{
                            type: 'input',
                            name: 'outDir',
                            message: '重新选择初始化的目录' }]);

                        this.outDir = answers.outDir;
                        targetDir = path.join(this.contextRoot, this.outDir);
                    }
                }
            }
            catch (e) {
                this.log((0, logger_1.error)(e.toString(), true));
                return this.env.error(e);
            }
            const demoPath = path.join(config_1.REPO_LOCAL_ROOT_PATH, appType, template, language);
            if (fs_extra_1.default.existsSync(demoPath)) {
                try {
                    this.copyDestination(demoPath, targetDir, {
                        globOptions: {
                            dot: true } });


                }
                catch (e) {
                    this.log((0, logger_1.error)('模版复制失败' + JSON.stringify(e), true));
                    return this.env.error(new Error(errors_1.ERROR_DEMO_COPY));
                }
            } else
            {
                return this.env.error(new Error(errors_1.ERROR_REPO_NOT_FOUND));
            }
            this.log((0, logger_1.done)('模版复制成功', true));
        });
    }
    // npm install
    install() {
        const outDir = this.outDir;
        const outDirPath = path.join(this.contextRoot, outDir);
        const pkgJsonPath = path.join(outDirPath, 'package.json');
        const skipInstall = this.options['skip-install'];
        if (fs_extra_1.default.existsSync(pkgJsonPath) && !skipInstall) {
            process.chdir(outDirPath);
            this.installDependencies({
                npm: true,
                yarn: false,
                bower: false });

        }
    }
    // say good bye
    end() {
        const outDir = this.outDir;
        const wd = path.join(this.contextRoot, outDir);
        this.log((0, logger_1.done)(`你的项目已经初始化到目录 ${wd} 下。`, true));
    }};