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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../../../../roles/infrastructure/persistence/relational/entities/role.entity");
const status_entity_1 = require("../../../../../statuses/infrastructure/persistence/relational/entities/status.entity");
const file_entity_1 = require("../../../../../files/infrastructure/persistence/relational/entities/file.entity");
const auth_providers_enum_1 = require("../../../../../auth/auth-providers.enum");
const relational_entity_helper_1 = require("../../../../../utils/relational-entity-helper");
let UserEntity = class UserEntity extends relational_entity_helper_1.EntityRelationalHelper {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: auth_providers_enum_1.AuthProvidersEnum.email }),
    __metadata("design:type", String)
], UserEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "socialId", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => file_entity_1.FileEntity, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], UserEntity.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, {
        eager: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => status_entity_1.StatusEntity, {
        eager: true,
    }),
    __metadata("design:type", status_entity_1.StatusEntity)
], UserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'user',
    })
], UserEntity);
//# sourceMappingURL=user.entity.js.map