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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./infrastructure/persistence/user.repository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_providers_enum_1 = require("../auth/auth-providers.enum");
const files_service_1 = require("../files/files.service");
const roles_enum_1 = require("../roles/roles.enum");
const statuses_enum_1 = require("../statuses/statuses.enum");
let UsersService = class UsersService {
    constructor(usersRepository, filesService) {
        this.usersRepository = usersRepository;
        this.filesService = filesService;
    }
    async create(createUserDto) {
        let password = undefined;
        if (createUserDto.password) {
            const salt = await bcryptjs_1.default.genSalt();
            password = await bcryptjs_1.default.hash(createUserDto.password, salt);
        }
        let email = null;
        if (createUserDto.email) {
            const userObject = await this.usersRepository.findByEmail(createUserDto.email);
            if (userObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'emailAlreadyExists',
                    },
                });
            }
            email = createUserDto.email;
        }
        let photo = undefined;
        if (createUserDto.photo?.id) {
            const fileObject = await this.filesService.findById(createUserDto.photo.id);
            if (!fileObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        photo: 'imageNotExists',
                    },
                });
            }
            photo = fileObject;
        }
        else if (createUserDto.photo === null) {
            photo = null;
        }
        let role = undefined;
        if (createUserDto.role?.id) {
            const roleObject = Object.values(roles_enum_1.RoleEnum)
                .map(String)
                .includes(String(createUserDto.role.id));
            if (!roleObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        role: 'roleNotExists',
                    },
                });
            }
            role = {
                id: createUserDto.role.id,
            };
        }
        let status = undefined;
        if (createUserDto.status?.id) {
            const statusObject = Object.values(statuses_enum_1.StatusEnum)
                .map(String)
                .includes(String(createUserDto.status.id));
            if (!statusObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        status: 'statusNotExists',
                    },
                });
            }
            status = {
                id: createUserDto.status.id,
            };
        }
        return this.usersRepository.create({
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: email,
            password: password,
            photo: photo,
            role: role,
            status: status,
            provider: createUserDto.provider ?? auth_providers_enum_1.AuthProvidersEnum.email,
            socialId: createUserDto.socialId,
        });
    }
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        return this.usersRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }
    findById(id) {
        return this.usersRepository.findById(id);
    }
    findByIds(ids) {
        return this.usersRepository.findByIds(ids);
    }
    findByEmail(email) {
        return this.usersRepository.findByEmail(email);
    }
    findBySocialIdAndProvider({ socialId, provider, }) {
        return this.usersRepository.findBySocialIdAndProvider({
            socialId,
            provider,
        });
    }
    async update(id, updateUserDto) {
        let password = undefined;
        if (updateUserDto.password) {
            const userObject = await this.usersRepository.findById(id);
            if (userObject && userObject?.password !== updateUserDto.password) {
                const salt = await bcryptjs_1.default.genSalt();
                password = await bcryptjs_1.default.hash(updateUserDto.password, salt);
            }
        }
        let email = undefined;
        if (updateUserDto.email) {
            const userObject = await this.usersRepository.findByEmail(updateUserDto.email);
            if (userObject && userObject.id !== id) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        email: 'emailAlreadyExists',
                    },
                });
            }
            email = updateUserDto.email;
        }
        else if (updateUserDto.email === null) {
            email = null;
        }
        let photo = undefined;
        if (updateUserDto.photo?.id) {
            const fileObject = await this.filesService.findById(updateUserDto.photo.id);
            if (!fileObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        photo: 'imageNotExists',
                    },
                });
            }
            photo = fileObject;
        }
        else if (updateUserDto.photo === null) {
            photo = null;
        }
        let role = undefined;
        if (updateUserDto.role?.id) {
            const roleObject = Object.values(roles_enum_1.RoleEnum)
                .map(String)
                .includes(String(updateUserDto.role.id));
            if (!roleObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        role: 'roleNotExists',
                    },
                });
            }
            role = {
                id: updateUserDto.role.id,
            };
        }
        let status = undefined;
        if (updateUserDto.status?.id) {
            const statusObject = Object.values(statuses_enum_1.StatusEnum)
                .map(String)
                .includes(String(updateUserDto.status.id));
            if (!statusObject) {
                throw new common_1.UnprocessableEntityException({
                    status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                        status: 'statusNotExists',
                    },
                });
            }
            status = {
                id: updateUserDto.status.id,
            };
        }
        return this.usersRepository.update(id, {
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            email,
            password,
            photo,
            role,
            status,
            provider: updateUserDto.provider,
            socialId: updateUserDto.socialId,
        });
    }
    async remove(id) {
        await this.usersRepository.remove(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        files_service_1.FilesService])
], UsersService);
//# sourceMappingURL=users.service.js.map