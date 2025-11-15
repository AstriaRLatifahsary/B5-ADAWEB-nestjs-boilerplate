"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const file_entity_1 = require("../../../../../files/infrastructure/persistence/relational/entities/file.entity");
const file_mapper_1 = require("../../../../../files/infrastructure/persistence/relational/mappers/file.mapper");
const role_entity_1 = require("../../../../../roles/infrastructure/persistence/relational/entities/role.entity");
const status_entity_1 = require("../../../../../statuses/infrastructure/persistence/relational/entities/status.entity");
const user_1 = require("../../../../domain/user");
const user_entity_1 = require("../entities/user.entity");
class UserMapper {
    static toDomain(raw) {
        const domainEntity = new user_1.User();
        domainEntity.id = raw.id;
        domainEntity.email = raw.email;
        domainEntity.password = raw.password;
        domainEntity.provider = raw.provider;
        domainEntity.socialId = raw.socialId;
        domainEntity.firstName = raw.firstName;
        domainEntity.lastName = raw.lastName;
        if (raw.photo) {
            domainEntity.photo = file_mapper_1.FileMapper.toDomain(raw.photo);
        }
        domainEntity.role = raw.role;
        domainEntity.status = raw.status;
        domainEntity.createdAt = raw.createdAt;
        domainEntity.updatedAt = raw.updatedAt;
        domainEntity.deletedAt = raw.deletedAt;
        return domainEntity;
    }
    static toPersistence(domainEntity) {
        let role = undefined;
        if (domainEntity.role) {
            role = new role_entity_1.RoleEntity();
            role.id = Number(domainEntity.role.id);
        }
        let photo = undefined;
        if (domainEntity.photo) {
            photo = new file_entity_1.FileEntity();
            photo.id = domainEntity.photo.id;
            photo.path = domainEntity.photo.path;
        }
        else if (domainEntity.photo === null) {
            photo = null;
        }
        let status = undefined;
        if (domainEntity.status) {
            status = new status_entity_1.StatusEntity();
            status.id = Number(domainEntity.status.id);
        }
        const persistenceEntity = new user_entity_1.UserEntity();
        if (domainEntity.id && typeof domainEntity.id === 'number') {
            persistenceEntity.id = domainEntity.id;
        }
        persistenceEntity.email = domainEntity.email;
        persistenceEntity.password = domainEntity.password;
        persistenceEntity.provider = domainEntity.provider;
        persistenceEntity.socialId = domainEntity.socialId;
        persistenceEntity.firstName = domainEntity.firstName;
        persistenceEntity.lastName = domainEntity.lastName;
        persistenceEntity.photo = photo;
        persistenceEntity.role = role;
        persistenceEntity.status = status;
        persistenceEntity.createdAt = domainEntity.createdAt;
        persistenceEntity.updatedAt = domainEntity.updatedAt;
        persistenceEntity.deletedAt = domainEntity.deletedAt;
        return persistenceEntity;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map