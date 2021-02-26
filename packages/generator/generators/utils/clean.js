"use strict";
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {return value instanceof P ? value : new P(function (resolve) {resolve(value);});}
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {try {step(generator.next(value));} catch (e) {reject(e);}}
        function rejected(value) {try {step(generator["throw"](value));} catch (e) {reject(e);}}
        function step(result) {result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);}
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = require("fs");
exports.default = filePath => __awaiter(void 0, void 0, void 0, function* () {
    if (!filePath)
    return;
    if (!fs.existsSync(filePath)) {
        console.warn(`ENOENT ${filePath} is not exist`);
        return;
    }
    const statInfo = fs.statSync(filePath);
    const isDirectory = statInfo.isDirectory();
    if (isDirectory) {
        console.warn(`Clean a directory: ${filePath}`);
    }
    try {
        child_process_1.execSync(`ls ${filePath}`);
    }
    catch (e) {
        console.warn(`ll exec failed. filePath: ${filePath}`);
    }
    try {
        child_process_1.execSync(`rm -r ${filePath}`);
        console.log(`Clean success. filePath: ${filePath}`);
    }
    catch (e) {
        console.warn(`Clean failed. filePath: ${filePath}. ${e}`);
    }
});