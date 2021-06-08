"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
/**
 * 会强制覆盖目标文件且静默
 */
exports.default = (source, dest) => {
    try {
        child_process_1.execSync(`cp -af ${path.join(source, '/')} ${dest}`);
    }
    catch (e) {
        console.error('exec cp error', e);
        throw e;
    }
};
