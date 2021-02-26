"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.done = exports.info = exports.debug = void 0;
const chalk = require("chalk");
const strip_ansi_1 = require("strip-ansi");
const format = (label, msg) => {
    return msg.split('\n').map((line, i) => {
        return i === 0 ?
        `${label} ${line}` :
        line.padStart(strip_ansi_1.default(label).length);
    }).join('\n');
};
const debug = msg => {
    const txt = format(chalk.bgBlue.black(' DEBUG '), msg);
    return process.env.NODE_ENV === '__DEBUG__' && console.log(txt);
};
exports.debug = debug;
const info = (msg, pure) => {
    const txt = format(chalk.bgBlue.black(' INFO '), msg);
    return pure ? txt : console.log(pure);
};
exports.info = info;
const done = (msg, pure) => {
    const txt = format(chalk.bgGreen.black(' DONE '), msg);
    return pure ? txt : console.log(pure);
};
exports.done = done;
const warn = (msg, pure) => {
    const txt = format(chalk.bgYellow.black(' WARN '), msg);
    return pure ? txt : console.warn(pure);
};
exports.warn = warn;
const error = (msg, pure) => {
    const txt = format(chalk.bgRed(' ERROR '), msg);
    return pure ? txt : console.error(pure);
};
exports.error = error;