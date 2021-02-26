"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_APP_TYPE_NOT_FOUND = exports.ERROR_DEMO_COPY = exports.ERROR_PM_NOT_FOUND = exports.ERROR_REPO_NOT_FOUND = void 0;
exports.ERROR_REPO_NOT_FOUND = 'Cannot find the repo, please check the template and language you type';
exports.ERROR_PM_NOT_FOUND = 'All PackageManager(yarn, pnpm, npm) no found, Please check the context';
exports.ERROR_DEMO_COPY = 'Demo repo copy failed. Please check if you have enough auth to operate the cwd, then use --force-update-repo to update the repo';
exports.ERROR_APP_TYPE_NOT_FOUND = 'The appType is not valid. Cannot find a repo path for this appType';