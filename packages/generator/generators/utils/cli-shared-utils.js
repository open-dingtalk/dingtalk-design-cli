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
exports.hasPnpm3OrLater = exports.hasPnpmVersionOrLater = exports.getPnpmVersion = exports.hasPnpm = exports.hasNpm = exports.hasYarn = void 0;
const child_process_1 = require("child_process");
const semver = __importStar(require("semver"));
function hasYarn() {
    try {
        (0, child_process_1.execSync)('yarn --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasYarn = hasYarn;
function hasNpm() {
    try {
        (0, child_process_1.execSync)('npm --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasNpm = hasNpm;
function hasPnpm() {
    try {
        (0, child_process_1.execSync)('npm --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasPnpm = hasPnpm;
function getPnpmVersion() {
    let pnpmversion;
    try {
        pnpmversion = (0, child_process_1.execSync)('pnpm --version', {
            stdio: ['pipe', 'pipe', 'ignore'] }).
        toString();
        // there's a critical bug in pnpm 2
        // https://github.com/pnpm/pnpm/issues/1678#issuecomment-469981972
        // so we only support pnpm >= 3.0.0
    } finally
    {
        pnpmversion = pnpmversion || '0.0.0';
    }
    return pnpmversion;
}
exports.getPnpmVersion = getPnpmVersion;
function hasPnpmVersionOrLater(version) {
    return semver.gte(getPnpmVersion(), version);
}
exports.hasPnpmVersionOrLater = hasPnpmVersionOrLater;
function hasPnpm3OrLater() {
    return hasPnpmVersionOrLater('3.0.0');
}
exports.hasPnpm3OrLater = hasPnpm3OrLater;