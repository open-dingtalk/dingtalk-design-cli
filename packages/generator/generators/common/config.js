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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUBS_CONFIG = exports.DEFAULT_DIRECTORY_SEPERATOR = exports.REPO_LOCAL_ROOT_PATH = exports.RC_PATH = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const constants_1 = require("./constants");
// 配置文件
exports.RC_PATH = path.join(os.homedir(), '.dd-cli-rc.json');
// 本地缓存
exports.REPO_LOCAL_ROOT_PATH = path.join(os.homedir(), '.dd-demo-repo');
// 代码仓库目录名分隔符，合格的目录名格式: ${appType}${seperator}${desc}
exports.DEFAULT_DIRECTORY_SEPERATOR = '_';
const DEFAULT_REPO_REMOTE_PATH = process.env.REPO_REMOTE_PATH || 'https://gitee.com/open-dingtalk/dd-application-template.git';
// 套件配置
exports.HUBS_CONFIG = [
{
    key: constants_1.APP_TYPE_ENUM.PLUGIN,
    name: '工作台组件',
    repoRemotePath: DEFAULT_REPO_REMOTE_PATH },

{
    key: constants_1.APP_TYPE_ENUM.MP,
    name: '小程序',
    repoRemotePath: DEFAULT_REPO_REMOTE_PATH },

{
    key: constants_1.APP_TYPE_ENUM.H5,
    name: 'H5微应用',
    repoRemotePath: DEFAULT_REPO_REMOTE_PATH }];