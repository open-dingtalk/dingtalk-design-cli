"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("./store");
const semver = require("semver");
const getRemoteVersion_1 = require("./getRemoteVersion");
const localStore = new store_1.default();
function getVersions() {
    return __awaiter(this, void 0, void 0, function* () {
        const localConfig = localStore.getAll();
        const pkg = require('../../package.json');
        const pkgVersion = pkg.version;
        const pkgName = pkg.name;
        const daysPassed = (Date.now() - localConfig.lastUpdateCheck || 0) / (60 * 60 * 1000 * 24);
        const res = {
            current: pkgVersion,
            latest: localConfig.latestVersion || pkgVersion,
            error: null,
        };
        try {
            // won't repeatly check in a day
            if (daysPassed > 1) {
                res.latest = semver.gt(localConfig.latestVersion, pkgVersion) ? localConfig.latestVersion : pkgVersion;
            }
            else {
                const latestVersion = yield getRemoteVersion_1.default(pkgName);
                localStore.setAll({
                    lastUpdateCheck: Date.now(),
                    latestVersion,
                });
                res.latest = latestVersion;
            }
        }
        catch (e) {
            res.error = e.message;
        }
        return res;
    });
}
exports.default = getVersions;
