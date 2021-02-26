"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPnpm3OrLater = exports.hasPnpmVersionOrLater = exports.getPnpmVersion = exports.hasPnpm = exports.hasNpm = exports.hasYarn = void 0;
const child_process_1 = require("child_process");
const semver = require("semver");
function hasYarn() {
    try {
        child_process_1.execSync('yarn --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasYarn = hasYarn;
function hasNpm() {
    try {
        child_process_1.execSync('npm --version', { stdio: 'ignore' });
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.hasNpm = hasNpm;
function hasPnpm() {
    try {
        child_process_1.execSync('npm --version', { stdio: 'ignore' });
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
        pnpmversion = child_process_1.execSync('pnpm --version', {
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