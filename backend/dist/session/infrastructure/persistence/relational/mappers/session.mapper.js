"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMapper = void 0;
const user_entity_1 = require("../../../../../users/infrastructure/persistence/relational/entities/user.entity");
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/relational/mappers/user.mapper");
const session_1 = require("../../../../domain/session");
const session_entity_1 = require("../entities/session.entity");
class SessionMapper {
    static toDomain(raw) {
        const domainEntity = new session_1.Session();
        domainEntity.id = raw.id;
        if (raw.user) {
            domainEntity.user = user_mapper_1.UserMapper.toDomain(raw.user);
        }
        domainEntity.hash = raw.hash;
        domainEntity.createdAt = raw.createdAt;
        domainEntity.updatedAt = raw.updatedAt;
        domainEntity.deletedAt = raw.deletedAt;
        return domainEntity;
    }
    static toPersistence(domainEntity) {
        const user = new user_entity_1.UserEntity();
        user.id = Number(domainEntity.user.id);
        const persistenceEntity = new session_entity_1.SessionEntity();
        if (domainEntity.id && typeof domainEntity.id === 'number') {
            persistenceEntity.id = domainEntity.id;
        }
        persistenceEntity.hash = domainEntity.hash;
        persistenceEntity.user = user;
        persistenceEntity.createdAt = domainEntity.createdAt;
        persistenceEntity.updatedAt = domainEntity.updatedAt;
        persistenceEntity.deletedAt = domainEntity.deletedAt;
        return persistenceEntity;
    }
}
exports.SessionMapper = SessionMapper;
//# sourceMappingURL=session.mapper.js.map