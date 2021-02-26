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
/**
                                                                * inspect fn which run out of time
                                                                * @param fn inspected callback, must be a promise
                                                                * @param interval time interval
                                                                */
exports.default = (fn, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger = console.log, interval = 3 * 1000, fetchingTips = 'fetching...', timeout = 30 * 1000, timeoutTips = 'task timeout' } = opts || {};
    const timer = setInterval(() => {
        logger(fetchingTips);
    }, interval);
    const killerTimer = setTimeout(() => {
        clearInterval(timer);
        clearTimeout(killerTimer);
        throw timeoutTips;
    }, timeout);
    try {
        yield fn();
    } finally
    {
        clearInterval(timer);
        clearTimeout(killerTimer);
    }
});