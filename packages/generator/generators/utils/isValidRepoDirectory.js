"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../common/config");
/**
                                               * is valid repo directory
                                               * @param directoryName
                                               * @param appType
                                               * @param seperator
                                               */
const isValidRepoDirectory = (directoryName, appType, seperator = config_1.DEFAULT_DIRECTORY_SEPERATOR) => {
  return !directoryName.startsWith('.') && directoryName.startsWith(`${appType}${seperator}`);
};
exports.default = isValidRepoDirectory;