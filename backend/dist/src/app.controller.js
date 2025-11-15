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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path_1 = require("path");
const viewEngine_1 = require("./common/viewEngine");
let AppController = class AppController {
    switchTheme(res) {
        const configPath = (0, path_1.join)(__dirname, '..', 'config', 'theme.json');
        const themeConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        const newTheme = themeConfig.theme === 'dark' ? 'default' : 'dark';
        themeConfig.theme = newTheme;
        fs.writeFileSync(configPath, JSON.stringify(themeConfig, null, 2));
        console.log(`🎨 Tema diubah ke: ${newTheme}`);
        if (this.app)
            (0, viewEngine_1.setupViewEngine)(this.app);
        const referer = res.req.headers.referer;
        return res.redirect(referer || '/');
    }
    setTheme(res, theme) {
        const configPath = (0, path_1.join)(__dirname, '..', 'config', 'theme.json');
        const themeConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        themeConfig.theme = theme;
        fs.writeFileSync(configPath, JSON.stringify(themeConfig, null, 2));
        console.log(`🎨 Tema diubah ke: ${theme}`);
        if (this.app)
            (0, viewEngine_1.setupViewEngine)(this.app);
        const referer = res.req.headers.referer;
        return res.redirect(referer || '/');
    }
    themeLight(res) {
        return this.setTheme(res, 'default');
    }
    themeDark(res) {
        return this.setTheme(res, 'dark');
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/switch-theme'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "switchTheme", null);
__decorate([
    (0, common_1.Get)('/theme/light'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "themeLight", null);
__decorate([
    (0, common_1.Get)('/theme/dark'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "themeDark", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map