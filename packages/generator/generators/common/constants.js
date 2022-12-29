"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_APP_TYPE = exports.APP_TYPE_ENUM = void 0;
var APP_TYPE_ENUM;
(function (APP_TYPE_ENUM) {
    APP_TYPE_ENUM["PLUGIN"] = "plugin";
    APP_TYPE_ENUM["MP"] = "mp";
    APP_TYPE_ENUM["H5"] = "h5";
    APP_TYPE_ENUM["DOCSADDON"] = "docsaddon";
})(APP_TYPE_ENUM = exports.APP_TYPE_ENUM || (exports.APP_TYPE_ENUM = {}));
exports.DEFAULT_APP_TYPE = APP_TYPE_ENUM.PLUGIN;