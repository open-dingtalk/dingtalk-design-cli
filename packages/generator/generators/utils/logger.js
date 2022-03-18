"use strict";
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.done = exports.info = exports.debug = void 0;
const chalk_1 = __importDefault(require("chalk"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const format = (label, msg) => {
    return msg.split('\n').map((line, i) => {
        return i === 0 ?
        `${label} ${line}` :
        line.padStart(strip_ansi_1.default(label).length);
    }).join('\n');
};
const debug = msg => {
    const txt = format(chalk_1.default.bgBlue.black(' DEBUG '), msg);
    return process.env.DEBUG && console.log(txt);
};
exports.debug = debug;
const info = (msg, pure) => {
    const txt = format(chalk_1.default.bgBlue.black(' INFO '), msg);
    return pure ? txt : console.log(pure);
};
exports.info = info;
const done = (msg, pure) => {
    const txt = format(chalk_1.default.bgGreen.black(' DONE '), msg);
    return pure ? txt : console.log(pure);
};
exports.done = done;
const warn = (msg, pure) => {
    const txt = format(chalk_1.default.bgYellow.black(' WARN '), msg);
    return pure ? txt : console.warn(pure);
};
exports.warn = warn;
const error = (msg, pure) => {
    const txt = format(chalk_1.default.bgRed(' ERROR '), msg);
    return pure ? txt : console.error(pure);
};
exports.error = error;