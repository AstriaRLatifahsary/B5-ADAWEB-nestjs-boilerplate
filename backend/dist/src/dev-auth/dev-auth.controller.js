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
exports.DevAuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let DevAuthController = class DevAuthController {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(body) {
        const userId = body?.id ?? 1;
        const secret = this.configService.getOrThrow('auth.secret', {
            infer: true,
        });
        const token = await this.jwtService.signAsync({ id: userId }, { secret, expiresIn: '1h' });
        return {
            token,
            expiresIn: 3600,
        };
    }
};
exports.DevAuthController = DevAuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DevAuthController.prototype, "login", null);
exports.DevAuthController = DevAuthController = __decorate([
    (0, common_1.Controller)({ path: 'dev', version: '1' }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], DevAuthController);
//# sourceMappingURL=dev-auth.controller.js.map