"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUBS_CONFIG = exports.DEFAULT_DIRECTORY_SEPERATOR = exports.REPO_LOCAL_ROOT_PATH = exports.RC_PATH = void 0;
const os = require("os");
const path = require("path");
const constants_1 = require("./constants");
// 配置文件
exports.RC_PATH = path.join(os.homedir(), '.dd-cli-rc.json');
// 本地缓存
exports.REPO_LOCAL_ROOT_PATH = path.join(os.homedir(), '.dd-demo-repo');
// 代码仓库目录名分隔符，合格的目录名格式: ${appType}${seperator}${desc}
exports.DEFAULT_DIRECTORY_SEPERATOR = '_';
// 套件配置
exports.HUBS_CONFIG = [
{
    key: constants_1.APP_TYPE_ENUM.PLUGIN,
    name: '自定义组件',
    repoRemotePath: 'https://github.com/open-dingtalk/dd-application-template.git' },

{
    key: constants_1.APP_TYPE_ENUM.MP,
    name: '小程序',
    repoRemotePath: 'https://github.com/open-dingtalk/dd-application-template.git' },

{
    key: constants_1.APP_TYPE_ENUM.H5,
    name: 'H5微应用',
    repoRemotePath: 'https://github.com/open-dingtalk/dd-application-template.git' }];