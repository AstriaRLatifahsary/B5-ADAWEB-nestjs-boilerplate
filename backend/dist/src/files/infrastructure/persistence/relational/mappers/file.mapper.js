"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMapper = void 0;
const file_1 = require("../../../../domain/file");
const file_entity_1 = require("../entities/file.entity");
class FileMapper {
    static toDomain(raw) {
        const domainEntity = new file_1.FileType();
        domainEntity.id = raw.id;
        domainEntity.path = raw.path;
        return domainEntity;
    }
    static toPersistence(domainEntity) {
        const persistenceEntity = new file_entity_1.FileEntity();
        persistenceEntity.id = domainEntity.id;
        persistenceEntity.path = domainEntity.path;
        return persistenceEntity;
    }
}
exports.FileMapper = FileMapper;
//# sourceMappingURL=file.mapper.js.map