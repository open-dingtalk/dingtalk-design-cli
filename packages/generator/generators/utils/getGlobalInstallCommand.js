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
const execa = __importStar(require("execa"));
const cli_shared_utils_1 = require("./cli-shared-utils");
/**
                                                           * when use npm link to debug, would get nothing because
                                                           * `__dirname` is wrong
                                                           */
function getGlobalInstallCommand() {
    if ((0, cli_shared_utils_1.hasYarn)()) {
        const { stdout: yarnGlobalDir } = execa.sync('yarn', ['global', 'dir']);
        if (__dirname.includes(yarnGlobalDir)) {
            return 'yarn global add';
        }
    }
    if ((0, cli_shared_utils_1.hasPnpm3OrLater)()) {
        const { stdout: pnpmGlobalPrefix } = execa.sync('pnpm', ['config', 'get', 'prefix']);
        if (__dirname.includes(pnpmGlobalPrefix) && __dirname.includes('pnpm-global')) {
            return 'pnpm i -g';
        }
    }
    const { stdout: npmGlobalPrefix } = execa.sync('npm', ['config', 'get', 'prefix']);
    if (__dirname.includes(npmGlobalPrefix)) {
        return 'npm i -g';
    }
}
exports.default = getGlobalInstallCommand;