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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFacebookService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AuthFacebookService = class AuthFacebookService {
    constructor(configService) {
        this.configService = configService;
        this.baseUrl = 'https://graph.facebook.com';
        this.apiVersion = 'v23.0';
    }
    async getProfileByToken(loginDto) {
        try {
            await this.verifyAccessToken(loginDto.accessToken);
            const profileUrl = new URL(`${this.baseUrl}/${this.apiVersion}/me`);
            profileUrl.searchParams.set('fields', 'id,last_name,email,first_name');
            profileUrl.searchParams.set('access_token', loginDto.accessToken);
            const response = await fetch(profileUrl.toString(), {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
                signal: AbortSignal.timeout(10000),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new common_1.HttpException(errorData.error?.message || 'Facebook API error', response.status);
            }
            const data = await response.json();
            if (!data.id) {
                throw new common_1.HttpException('Invalid Facebook profile data', common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                id: data.id,
                email: data.email || undefined,
                firstName: data.first_name || '',
                lastName: data.last_name || '',
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            if (error.name === 'TimeoutError') {
                throw new common_1.HttpException('Facebook API request timeout', common_1.HttpStatus.REQUEST_TIMEOUT);
            }
            throw new common_1.HttpException('Failed to get Facebook profile', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyAccessToken(accessToken) {
        try {
            const appId = this.configService.get('facebook.appId', { infer: true });
            const appSecret = this.configService.get('facebook.appSecret', {
                infer: true,
            });
            if (!appId || !appSecret) {
                throw new common_1.HttpException('Facebook app credentials not configured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const debugUrl = new URL(`${this.baseUrl}/debug_token`);
            const appAccessToken = `${appId}|${appSecret}`;
            debugUrl.searchParams.set('input_token', accessToken);
            debugUrl.searchParams.set('access_token', appAccessToken);
            const response = await fetch(debugUrl.toString(), {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
                signal: AbortSignal.timeout(5000),
            });
            if (!response.ok) {
                throw new common_1.HttpException('Token verification failed', common_1.HttpStatus.UNAUTHORIZED);
            }
            const result = await response.json();
            const tokenData = result.data;
            if (!tokenData.is_valid) {
                throw new common_1.HttpException('Invalid Facebook access token', common_1.HttpStatus.UNAUTHORIZED);
            }
            if (tokenData.app_id !== appId) {
                throw new common_1.HttpException('Access token does not belong to this app', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Token verification failed', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async exchangeForLongLivedToken(shortLivedToken) {
        try {
            const appId = this.configService.get('facebook.appId', { infer: true });
            const appSecret = this.configService.get('facebook.appSecret', {
                infer: true,
            });
            if (!appId || !appSecret) {
                throw new common_1.HttpException('Facebook app credentials not configured', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const tokenUrl = new URL(`${this.baseUrl}/oauth/access_token`);
            tokenUrl.searchParams.set('grant_type', 'fb_exchange_token');
            tokenUrl.searchParams.set('client_id', appId);
            tokenUrl.searchParams.set('client_secret', appSecret);
            tokenUrl.searchParams.set('fb_exchange_token', shortLivedToken);
            const response = await fetch(tokenUrl.toString(), {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new common_1.HttpException('Failed to exchange token', common_1.HttpStatus.BAD_REQUEST);
            }
            const data = await response.json();
            return data.access_token;
        }
        catch (error) {
            console.error('Facebook token exchange failed:', error);
            throw new common_1.HttpException('Failed to exchange token', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthFacebookService = AuthFacebookService;
exports.AuthFacebookService = AuthFacebookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthFacebookService);
//# sourceMappingURL=auth-facebook.service.js.map