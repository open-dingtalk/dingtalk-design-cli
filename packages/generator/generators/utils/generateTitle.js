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
const chalk_1 = __importDefault(require("chalk"));
const semver = __importStar(require("semver"));
const boxen_1 = __importDefault(require("boxen"));
const getVersions_1 = __importDefault(require("./getVersions"));
const getGlobalInstallCommand_1 = __importDefault(require("./getGlobalInstallCommand"));
const logger_1 = require("./logger");
function generateTitle(checkUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        const { current, latest, error } = yield (0, getVersions_1.default)();
        let title = chalk_1.default.bold.blue(`Dingding Worktab-Plugin v${current}`);
        if (error) {
            (0, logger_1.debug)(error);
            title += '\n' + chalk_1.default.red('Failed to check for updates');
        }
        if (checkUpdate && semver.gt(latest, current)) {
            let upgradeMessage = `New version available ${chalk_1.default.magenta(current)} → ${chalk_1.default.green(latest)}`;
            try {
                const command = (0, getGlobalInstallCommand_1.default)();
                let name = require("../../package.json").name;
                if (semver.prerelease(latest)) {
                    name += '@next';
                }
                if (command) {
                    upgradeMessage +=
                    `\nRun ${chalk_1.default.yellow(`${command} ${name}`)} to update!`;
                }
                // eslint-disable-next-line no-empty
            }
            catch (e) {
            } finally
            {
                const upgradeBox = (0, boxen_1.default)(upgradeMessage, {
                    align: 'center',
                    borderColor: 'green',
                    dimBorder: true,
                    padding: 1 });

                title += `\n${upgradeBox}\n`;
            }
        }
        return title;
    });
}
exports.default = generateTitle;