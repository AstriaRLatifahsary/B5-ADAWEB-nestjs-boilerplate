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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const ms_1 = __importDefault(require("ms"));
const crypto_1 = __importDefault(require("crypto"));
const random_string_generator_util_1 = require("@nestjs/common/utils/random-string-generator.util");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_providers_enum_1 = require("./auth-providers.enum");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const mail_service_1 = require("../mail/mail.service");
const roles_enum_1 = require("../roles/roles.enum");
const session_service_1 = require("../session/session.service");
const statuses_enum_1 = require("../statuses/statuses.enum");
let AuthService = class AuthService {
    constructor(jwtService, usersService, sessionService, mailService, configService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
        this.sessionService = sessionService;
        this.mailService = mailService;
        this.configService = configService;
    }
    async validateLogin(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'notFound',
                },
            });
        }
        if (user.provider !== auth_providers_enum_1.AuthProvidersEnum.email) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: `needLoginViaProvider:${user.provider}`,
                },
            });
        }
        if (!user.password) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectPassword',
                },
            });
        }
        const isValidPassword = await bcryptjs_1.default.compare(loginDto.password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    password: 'incorrectPassword',
                },
            });
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const session = await this.sessionService.create({
            user,
            hash,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
            hash,
        });
        return {
            refreshToken,
            token,
            tokenExpires,
            user,
        };
    }
    async validateSocialLogin(authProvider, socialData) {
        let user = null;
        const socialEmail = socialData.email?.toLowerCase();
        let userByEmail = null;
        if (socialEmail) {
            userByEmail = await this.usersService.findByEmail(socialEmail);
        }
        if (socialData.id) {
            user = await this.usersService.findBySocialIdAndProvider({
                socialId: socialData.id,
                provider: authProvider,
            });
        }
        if (user) {
            if (socialEmail && !userByEmail) {
                user.email = socialEmail;
            }
            await this.usersService.update(user.id, user);
        }
        else if (userByEmail) {
            user = userByEmail;
        }
        else if (socialData.id) {
            const role = {
                id: roles_enum_1.RoleEnum.user,
            };
            const status = {
                id: statuses_enum_1.StatusEnum.active,
            };
            user = await this.usersService.create({
                email: socialEmail ?? null,
                firstName: socialData.firstName ?? null,
                lastName: socialData.lastName ?? null,
                socialId: socialData.id,
                provider: authProvider,
                role,
                status,
            });
            user = await this.usersService.findById(user.id);
        }
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    user: 'userNotFound',
                },
            });
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const session = await this.sessionService.create({
            user,
            hash,
        });
        const { token: jwtToken, refreshToken, tokenExpires, } = await this.getTokensData({
            id: user.id,
            role: user.role,
            sessionId: session.id,
            hash,
        });
        return {
            refreshToken,
            token: jwtToken,
            tokenExpires,
            user,
        };
    }
    async register(dto) {
        const user = await this.usersService.create({
            ...dto,
            email: dto.email,
            role: {
                id: roles_enum_1.RoleEnum.user,
            },
            status: {
                id: statuses_enum_1.StatusEnum.inactive,
            },
        });
        const hash = await this.jwtService.signAsync({
            confirmEmailUserId: user.id,
        }, {
            secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
                infer: true,
            }),
            expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
                infer: true,
            }),
        });
        await this.mailService.userSignUp({
            to: dto.email,
            data: {
                hash,
            },
        });
    }
    async confirmEmail(hash) {
        let userId;
        try {
            const jwtData = await this.jwtService.verifyAsync(hash, {
                secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
                    infer: true,
                }),
            });
            userId = jwtData.confirmEmailUserId;
        }
        catch {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: `invalidHash`,
                },
            });
        }
        const user = await this.usersService.findById(userId);
        if (!user ||
            user?.status?.id?.toString() !== statuses_enum_1.StatusEnum.inactive.toString()) {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `notFound`,
            });
        }
        user.status = {
            id: statuses_enum_1.StatusEnum.active,
        };
        await this.usersService.update(user.id, user);
    }
    async confirmNewEmail(hash) {
        let userId;
        let newEmail;
        try {
            const jwtData = await this.jwtService.verifyAsync(hash, {
                secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
                    infer: true,
                }),
            });
            userId = jwtData.confirmEmailUserId;
            newEmail = jwtData.newEmail;
        }
        catch {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: `invalidHash`,
                },
            });
        }
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: `notFound`,
            });
        }
        user.email = newEmail;
        user.status = {
            id: statuses_enum_1.StatusEnum.active,
        };
        await this.usersService.update(user.id, user);
    }
    async forgotPassword(email) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    email: 'emailNotExists',
                },
            });
        }
        const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const hash = await this.jwtService.signAsync({
            forgotUserId: user.id,
        }, {
            secret: this.configService.getOrThrow('auth.forgotSecret', {
                infer: true,
            }),
            expiresIn: tokenExpiresIn,
        });
        await this.mailService.forgotPassword({
            to: email,
            data: {
                hash,
                tokenExpires,
            },
        });
    }
    async resetPassword(hash, password) {
        let userId;
        try {
            const jwtData = await this.jwtService.verifyAsync(hash, {
                secret: this.configService.getOrThrow('auth.forgotSecret', {
                    infer: true,
                }),
            });
            userId = jwtData.forgotUserId;
        }
        catch {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: `invalidHash`,
                },
            });
        }
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    hash: `notFound`,
                },
            });
        }
        user.password = password;
        await this.sessionService.deleteByUserId({
            userId: user.id,
        });
        await this.usersService.update(user.id, user);
    }
    async me(userJwtPayload) {
        return this.usersService.findById(userJwtPayload.id);
    }
    async update(userJwtPayload, userDto) {
        const currentUser = await this.usersService.findById(userJwtPayload.id);
        if (!currentUser) {
            throw new common_1.UnprocessableEntityException({
                status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                errors: {
                    user: 'userNotFound',
                },
            });
        }
        if (userDto.password) {
            if (!userDto.oldPassword) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: 'missingOldPassword',
                    },
                });
            }
            if (!currentUser.password) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: 'incorrectOldPassword',
                    },
                });
            }
            const isValidOldPassword = await bcryptjs_1.default.compare(userDto.oldPassword, currentUser.password);
            if (!isValidOldPassword) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        oldPassword: 'incorrectOldPassword',
                    },
                });
            }
            else {
                await this.sessionService.deleteByUserIdWithExclude({
                    userId: currentUser.id,
                    excludeSessionId: userJwtPayload.sessionId,
                });
            }
        }
        if (userDto.email && userDto.email !== currentUser.email) {
            const userByEmail = await this.usersService.findByEmail(userDto.email);
            if (userByEmail && userByEmail.id !== currentUser.id) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'emailExists',
                    },
                });
            }
            const hash = await this.jwtService.signAsync({
                confirmEmailUserId: currentUser.id,
                newEmail: userDto.email,
            }, {
                secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
                    infer: true,
                }),
            });
            await this.mailService.confirmNewEmail({
                to: userDto.email,
                data: {
                    hash,
                },
            });
        }
        delete userDto.email;
        delete userDto.oldPassword;
        await this.usersService.update(userJwtPayload.id, userDto);
        return this.usersService.findById(userJwtPayload.id);
    }
    async refreshToken(data) {
        const session = await this.sessionService.findById(data.sessionId);
        if (!session) {
            throw new common_1.UnauthorizedException();
        }
        if (session.hash !== data.hash) {
            throw new common_1.UnauthorizedException();
        }
        const hash = crypto_1.default
            .createHash('sha256')
            .update((0, random_string_generator_util_1.randomStringGenerator)())
            .digest('hex');
        const user = await this.usersService.findById(session.user.id);
        if (!user?.role) {
            throw new common_1.UnauthorizedException();
        }
        await this.sessionService.update(session.id, {
            hash,
        });
        const { token, refreshToken, tokenExpires } = await this.getTokensData({
            id: session.user.id,
            role: {
                id: user.role.id,
            },
            sessionId: session.id,
            hash,
        });
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
    async softDelete(user) {
        await this.usersService.remove(user.id);
    }
    async logout(data) {
        return this.sessionService.deleteById(data.sessionId);
    }
    async getTokensData(data) {
        const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
            infer: true,
        });
        const tokenExpires = Date.now() + (0, ms_1.default)(tokenExpiresIn);
        const [token, refreshToken] = await Promise.all([
            await this.jwtService.signAsync({
                id: data.id,
                role: data.role,
                sessionId: data.sessionId,
            }, {
                secret: this.configService.getOrThrow('auth.secret', { infer: true }),
                expiresIn: tokenExpiresIn,
            }),
            await this.jwtService.signAsync({
                sessionId: data.sessionId,
                hash: data.hash,
            }, {
                secret: this.configService.getOrThrow('auth.refreshSecret', {
                    infer: true,
                }),
                expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
                    infer: true,
                }),
            }),
        ]);
        return {
            token,
            refreshToken,
            tokenExpires,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService,
        session_service_1.SessionService,
        mail_service_1.MailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map