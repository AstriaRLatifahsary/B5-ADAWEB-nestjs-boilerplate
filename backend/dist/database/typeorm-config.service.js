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
exports.TypeOrmConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
let TypeOrmConfigService = class TypeOrmConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        const entitiesGlobs = [
            __dirname + '/../**/persistence/relational/entities/*.{ts,js}',
            __dirname + '/../**/*.entity{.ts,.js}',
        ];
        try {
            const resolved = entitiesGlobs
                .map((g) => glob_1.default.sync(g))
                .flat()
                .map((p) => path_1.default.resolve(p));
            if (resolved.length > 0) {
                console.log('[TypeOrm] Resolved entity files:');
                resolved.forEach((f) => console.log('  -', f));
            }
            else {
                console.log('[TypeOrm] No entity files matched by configured globs.');
            }
        }
        catch (e) {
            console.warn('[TypeOrm] Failed to resolve entity globs', e);
        }
        return {
            type: 'mysql',
            host: this.configService.get('database.host', { infer: true }),
            port: this.configService.get('database.port', { infer: true }),
            username: this.configService.get('database.username', { infer: true }),
            password: this.configService.get('database.password', { infer: true }),
            database: this.configService.get('database.name', { infer: true }),
            synchronize: this.configService.get('database.synchronize', {
                infer: true,
            }),
            dropSchema: false,
            keepConnectionAlive: true,
            logging: this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
            entities: entitiesGlobs,
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            extra: {
                connectionLimit: this.configService.get('database.maxConnections', {
                    infer: true,
                }),
            },
        };
    }
};
exports.TypeOrmConfigService = TypeOrmConfigService;
exports.TypeOrmConfigService = TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmConfigService);
//# sourceMappingURL=typeorm-config.service.js.map