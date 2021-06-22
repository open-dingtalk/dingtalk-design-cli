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
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
/**
                                         * Load a json object
                                         * @param filePath
                                         */
function loadJSON(filePath, loose = true, fallbackValue = {}) {
    const isExist = fs.existsSync(filePath);
    if (isExist) {
        try {
            const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
            return JSON.parse(content);
        }
        catch (e) {
            if (loose) {
                console.error(e);
                return fallbackValue;
            }
            throw new Error(`Failed to load: ${filePath}`);
        }
    } else
    {
        if (loose) {
            return fallbackValue;
        }
        throw new Error(`Non-existed path: ${filePath}`);
    }
}
exports.default = loadJSON;