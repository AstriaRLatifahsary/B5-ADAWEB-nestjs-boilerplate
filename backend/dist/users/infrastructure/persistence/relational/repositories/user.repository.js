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
exports.UsersRelationalRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const user_mapper_1 = require("../mappers/user.mapper");
let UsersRelationalRepository = class UsersRelationalRepository {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(data) {
        const persistenceModel = user_mapper_1.UserMapper.toPersistence(data);
        const newEntity = await this.usersRepository.save(this.usersRepository.create(persistenceModel));
        return user_mapper_1.UserMapper.toDomain(newEntity);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const where = {};
        if (filterOptions?.roles?.length) {
            where.role = filterOptions.roles.map((role) => ({
                id: Number(role.id),
            }));
        }
        const entities = await this.usersRepository.find({
            skip: (paginationOptions.page - 1) * paginationOptions.limit,
            take: paginationOptions.limit,
            where: where,
            order: sortOptions?.reduce((accumulator, sort) => ({
                ...accumulator,
                [sort.orderBy]: sort.order,
            }), {}),
        });
        return entities.map((user) => user_mapper_1.UserMapper.toDomain(user));
    }
    async findById(id) {
        const entity = await this.usersRepository.findOne({
            where: { id: Number(id) },
        });
        return entity ? user_mapper_1.UserMapper.toDomain(entity) : null;
    }
    async findByIds(ids) {
        const entities = await this.usersRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
        });
        return entities.map((user) => user_mapper_1.UserMapper.toDomain(user));
    }
    async findByEmail(email) {
        if (!email)
            return null;
        const entity = await this.usersRepository.findOne({
            where: { email },
        });
        return entity ? user_mapper_1.UserMapper.toDomain(entity) : null;
    }
    async findBySocialIdAndProvider({ socialId, provider, }) {
        if (!socialId || !provider)
            return null;
        const entity = await this.usersRepository.findOne({
            where: { socialId, provider },
        });
        return entity ? user_mapper_1.UserMapper.toDomain(entity) : null;
    }
    async update(id, payload) {
        const entity = await this.usersRepository.findOne({
            where: { id: Number(id) },
        });
        if (!entity) {
            throw new Error('User not found');
        }
        const updatedEntity = await this.usersRepository.save(this.usersRepository.create(user_mapper_1.UserMapper.toPersistence({
            ...user_mapper_1.UserMapper.toDomain(entity),
            ...payload,
        })));
        return user_mapper_1.UserMapper.toDomain(updatedEntity);
    }
    async remove(id) {
        await this.usersRepository.softDelete(id);
    }
};
exports.UsersRelationalRepository = UsersRelationalRepository;
exports.UsersRelationalRepository = UsersRelationalRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersRelationalRepository);
//# sourceMappingURL=user.repository.js.map