"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const auth_user_entity_1 = require("../auth/auth-user.entity");
const role_entity_1 = require("../roles/infrastructure/persistence/relational/entities/role.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    logging: true,
    entities: [auth_user_entity_1.AuthUser, role_entity_1.RoleEntity],
});
//# sourceMappingURL=data-source.js.map