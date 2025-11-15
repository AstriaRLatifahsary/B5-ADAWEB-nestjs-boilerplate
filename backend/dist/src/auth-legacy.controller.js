"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const { join } = require('path');
const legacy = require(join(process.cwd(), '..', 'backend', 'controllers', 'authController'));
let AuthWebController = class AuthWebController {
    showLogin(req, res) {
        return legacy.showLogin(req, res);
    }
    postLogin(req, res) {
        return legacy.postLogin(req, res);
    }
    showRegister(req, res) {
        return legacy.showRegister(req, res);
    }
    postRegister(req, res) {
        return legacy.postRegister(req, res);
    }
    logoutGet(req, res) {
        return legacy.logout(req, res);
    }
    logoutPost(req, res) {
        return legacy.logout(req, res);
    }
    showProfile(req, res) {
        return legacy.showProfile(req, res);
    }
    postProfile(req, res, file) {
        if (file)
            req.file = file;
        return legacy.postProfile(req, res);
    }
};
exports.AuthWebController = AuthWebController;
__decorate([
    (0, common_1.Get)(['login', 'login']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "showLogin", null);
__decorate([
    (0, common_1.Post)(['login', 'login']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "postLogin", null);
__decorate([
    (0, common_1.Get)(['register', 'register']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "showRegister", null);
__decorate([
    (0, common_1.Post)(['register', 'register']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "postRegister", null);
__decorate([
    (0, common_1.Get)(['logout', 'logout']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "logoutGet", null);
__decorate([
    (0, common_1.Post)(['logout', 'logout']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "logoutPost", null);
__decorate([
    (0, common_1.Get)(['profile', 'profile']),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "showProfile", null);
__decorate([
    (0, common_1.Post)(['profile', 'profile']),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AuthWebController.prototype, "postProfile", null);
exports.AuthWebController = AuthWebController = __decorate([
    (0, common_1.Controller)()
], AuthWebController);
//# sourceMappingURL=auth-legacy.controller.js.map