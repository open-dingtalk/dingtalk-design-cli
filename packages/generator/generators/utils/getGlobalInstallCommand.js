"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const cli_shared_utils_1 = require("./cli-shared-utils");
/**
 * when use npm link to debug, would get nothing because
 * `__dirname` is wrong
 */
function getGlobalInstallCommand() {
    if (cli_shared_utils_1.hasYarn()) {
        const { stdout: yarnGlobalDir, } = execa.sync('yarn', ['global', 'dir']);
        if (__dirname.includes(yarnGlobalDir)) {
            return 'yarn global add';
        }
    }
    if (cli_shared_utils_1.hasPnpm3OrLater()) {
        const { stdout: pnpmGlobalPrefix, } = execa.sync('pnpm', ['config', 'get', 'prefix']);
        if (__dirname.includes(pnpmGlobalPrefix) && __dirname.includes('pnpm-global')) {
            return 'pnpm i -g';
        }
    }
    const { stdout: npmGlobalPrefix, } = execa.sync('npm', ['config', 'get', 'prefix']);
    if (__dirname.includes(npmGlobalPrefix)) {
        return 'npm i -g';
    }
}
exports.default = getGlobalInstallCommand;
