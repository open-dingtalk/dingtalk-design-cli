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
const chalk = require("chalk");
const semver = require("semver");
const boxen = require("boxen");
const getVersions_1 = require("./getVersions");
const getGlobalInstallCommand_1 = require("./getGlobalInstallCommand");
const logger_1 = require("./logger");
function generateTitle(checkUpdate) {
    return __awaiter(this, void 0, void 0, function* () {
        const { current, latest, error } = yield getVersions_1.default();
        let title = chalk.bold.blue(`Dingding Worktab-Plugin v${current}`);
        if (error) {
            logger_1.debug(error);
            title += '\n' + chalk.red('Failed to check for updates');
        }
        if (checkUpdate && semver.gt(latest, current)) {
            let upgradeMessage = `New version available ${chalk.magenta(current)} → ${chalk.green(latest)}`;
            try {
                const command = getGlobalInstallCommand_1.default();
                let name = require("../../package.json").name;
                if (semver.prerelease(latest)) {
                    name += '@next';
                }
                if (command) {
                    upgradeMessage +=
                    `\nRun ${chalk.yellow(`${command} ${name}`)} to update!`;
                }
                // eslint-disable-next-line no-empty
            }
            catch (e) {
            } finally
            {
                const upgradeBox = boxen(upgradeMessage, {
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