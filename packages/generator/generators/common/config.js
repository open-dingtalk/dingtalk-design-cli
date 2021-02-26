"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HUBS_CONFIG = exports.repoLocalRootPath = exports.rcPath = void 0;
const os = require("os");
const path = require("path");
const constants_1 = require("./constants");
// 配置文件
exports.rcPath = path.join(os.homedir(), '.dd-cli-rc.json');
// 本地缓存
exports.repoLocalRootPath = path.join(os.homedir(), '.dd-demo-repo');
// 套件配置
exports.HUBS_CONFIG = [
{
    name: constants_1.APP_TYPE_ENUM.PLUGIN,
    repoRemotePath: 'https://github.com/open-dingtalk/dd-application-template.git' }];