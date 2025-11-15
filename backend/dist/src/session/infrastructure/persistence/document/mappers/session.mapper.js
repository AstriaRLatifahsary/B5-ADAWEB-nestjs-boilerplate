"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMapper = void 0;
const user_schema_1 = require("../../../../../users/infrastructure/persistence/document/entities/user.schema");
const user_mapper_1 = require("../../../../../users/infrastructure/persistence/document/mappers/user.mapper");
const session_1 = require("../../../../domain/session");
const session_schema_1 = require("../entities/session.schema");
class SessionMapper {
    static toDomain(raw) {
        const domainEntity = new session_1.Session();
        domainEntity.id = raw._id.toString();
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
        const persistenceSchema = new user_schema_1.UserSchemaClass();
        persistenceSchema._id = domainEntity.user.id.toString();
        const sessionEntity = new session_schema_1.SessionSchemaClass();
        if (domainEntity.id && typeof domainEntity.id === 'string') {
            sessionEntity._id = domainEntity.id;
        }
        sessionEntity.user = persistenceSchema;
        sessionEntity.hash = domainEntity.hash;
        sessionEntity.createdAt = domainEntity.createdAt;
        sessionEntity.updatedAt = domainEntity.updatedAt;
        sessionEntity.deletedAt = domainEntity.deletedAt;
        return sessionEntity;
    }
}
exports.SessionMapper = SessionMapper;
//# sourceMappingURL=session.mapper.js.map