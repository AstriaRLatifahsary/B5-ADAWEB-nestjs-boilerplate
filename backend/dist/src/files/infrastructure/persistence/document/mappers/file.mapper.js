"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMapper = void 0;
const file_1 = require("../../../../domain/file");
const file_schema_1 = require("../entities/file.schema");
class FileMapper {
    static toDomain(raw) {
        const domainEntity = new file_1.FileType();
        domainEntity.id = raw._id.toString();
        domainEntity.path = raw.path;
        return domainEntity;
    }
    static toPersistence(domainEntity) {
        const persistenceSchema = new file_schema_1.FileSchemaClass();
        if (domainEntity.id) {
            persistenceSchema._id = domainEntity.id;
        }
        persistenceSchema.path = domainEntity.path;
        return persistenceSchema;
    }
}
exports.FileMapper = FileMapper;
//# sourceMappingURL=file.mapper.js.map