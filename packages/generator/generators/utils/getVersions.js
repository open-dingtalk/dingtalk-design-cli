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
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {return value instanceof P ? value : new P(function (resolve) {resolve(value);});}
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {try {step(generator.next(value));} catch (e) {reject(e);}}
        function rejected(value) {try {step(generator["throw"](value));} catch (e) {reject(e);}}
        function step(result) {result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);}
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
const semver = __importStar(require("semver"));
const getRemoteVersion_1 = __importDefault(require("./getRemoteVersion"));
const localStore = new store_1.default();
function getVersions() {
    return __awaiter(this, void 0, void 0, function* () {
        const localConfig = localStore.getAll();
        const pkg = require("../../package.json");
        const pkgVersion = pkg.version;
        const pkgName = pkg.name;
        const daysPassed = (Date.now() - localConfig.lastUpdateCheck || 0) / (60 * 60 * 1000 * 24);
        const res = {
            current: pkgVersion,
            latest: localConfig.latestVersion || pkgVersion,
            error: null };

        try {
            // won't repeatly check in a day
            if (daysPassed > 1) {
                res.latest = semver.gt(localConfig.latestVersion, pkgVersion) ? localConfig.latestVersion : pkgVersion;
            } else
            {
                const latestVersion = yield (0, getRemoteVersion_1.default)(pkgName);
                localStore.setAll({
                    lastUpdateCheck: Date.now(),
                    latestVersion });

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