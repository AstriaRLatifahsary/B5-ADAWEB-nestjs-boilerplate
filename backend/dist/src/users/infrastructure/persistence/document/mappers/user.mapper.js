"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_1 = require("../../../../domain/user");
const user_schema_1 = require("../entities/user.schema");
const file_schema_1 = require("../../../../../files/infrastructure/persistence/document/entities/file.schema");
const file_mapper_1 = require("../../../../../files/infrastructure/persistence/document/mappers/file.mapper");
const role_1 = require("../../../../../roles/domain/role");
const status_1 = require("../../../../../statuses/domain/status");
const role_schema_1 = require("../../../../../roles/infrastructure/persistence/document/entities/role.schema");
const status_schema_1 = require("../../../../../statuses/infrastructure/persistence/document/entities/status.schema");
class UserMapper {
    static toDomain(raw) {
        const domainEntity = new user_1.User();
        domainEntity.id = raw._id.toString();
        domainEntity.email = raw.email;
        domainEntity.password = raw.password;
        domainEntity.provider = raw.provider;
        domainEntity.socialId = raw.socialId;
        domainEntity.firstName = raw.firstName;
        domainEntity.lastName = raw.lastName;
        if (raw.photo) {
            domainEntity.photo = file_mapper_1.FileMapper.toDomain(raw.photo);
        }
        else if (raw.photo === null) {
            domainEntity.photo = null;
        }
        if (raw.role) {
            domainEntity.role = new role_1.Role();
            domainEntity.role.id = raw.role._id;
        }
        if (raw.status) {
            domainEntity.status = new status_1.Status();
            domainEntity.status.id = raw.status._id;
        }
        domainEntity.createdAt = raw.createdAt;
        domainEntity.updatedAt = raw.updatedAt;
        domainEntity.deletedAt = raw.deletedAt;
        return domainEntity;
    }
    static toPersistence(domainEntity) {
        let role = undefined;
        if (domainEntity.role) {
            role = new role_schema_1.RoleSchema();
            role._id = domainEntity.role.id.toString();
        }
        let photo = undefined;
        if (domainEntity.photo) {
            photo = new file_schema_1.FileSchemaClass();
            photo._id = domainEntity.photo.id;
            photo.path = domainEntity.photo.path;
        }
        let status = undefined;
        if (domainEntity.status) {
            status = new status_schema_1.StatusSchema();
            status._id = domainEntity.status.id.toString();
        }
        const persistenceSchema = new user_schema_1.UserSchemaClass();
        if (domainEntity.id && typeof domainEntity.id === 'string') {
            persistenceSchema._id = domainEntity.id;
        }
        persistenceSchema.email = domainEntity.email;
        persistenceSchema.password = domainEntity.password;
        persistenceSchema.provider = domainEntity.provider;
        persistenceSchema.socialId = domainEntity.socialId;
        persistenceSchema.firstName = domainEntity.firstName;
        persistenceSchema.lastName = domainEntity.lastName;
        persistenceSchema.photo = photo;
        persistenceSchema.role = role;
        persistenceSchema.status = status;
        persistenceSchema.createdAt = domainEntity.createdAt;
        persistenceSchema.updatedAt = domainEntity.updatedAt;
        persistenceSchema.deletedAt = domainEntity.deletedAt;
        return persistenceSchema;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map