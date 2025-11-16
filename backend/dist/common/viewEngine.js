"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupViewEngine = setupViewEngine;
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const fs = __importStar(require("fs"));
const path_1 = require("path");
const helpers_1 = __importDefault(require("./helpers"));
function setupViewEngine(app) {
    const configPath = (0, path_1.join)(__dirname, '..', '..', 'config', 'theme.json');
    const themeConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const activeTheme = themeConfig.theme || 'default';
    console.log(`Tema aktif: ${activeTheme}`);
    app.setBaseViewsDir((0, path_1.join)(process.cwd(), '..', 'frontend', 'themes', activeTheme, 'views'));
    app.setViewEngine('ejs');
    app.use(express_ejs_layouts_1.default);
    app.set('layout', 'layout');
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.locals = expressApp.locals || {};
    expressApp.locals.helpers = helpers_1.default;
}
//# sourceMappingURL=viewEngine.js.map