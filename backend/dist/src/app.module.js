"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = __importDefault(require("path"));
const apple_config_1 = __importDefault(require("./auth-apple/config/apple.config"));
const facebook_config_1 = __importDefault(require("./auth-facebook/config/facebook.config"));
const google_config_1 = __importDefault(require("./auth-google/config/google.config"));
const auth_config_1 = __importDefault(require("./auth/config/auth.config"));
const app_config_1 = __importDefault(require("./config/app.config"));
const database_config_1 = __importDefault(require("./database/config/database.config"));
const file_config_1 = __importDefault(require("./files/config/file.config"));
const mail_config_1 = __importDefault(require("./mail/config/mail.config"));
const app_controller_1 = require("./app.controller");
const auth_legacy_controller_1 = require("./auth-legacy.controller");
const home_module_1 = require("./home/home.module");
const mail_module_1 = require("./mail/mail.module");
const mailer_module_1 = require("./mailer/mailer.module");
const posts_module_1 = require("./posts/posts.module");
const nestjs_i18n_1 = require("nestjs-i18n");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_config_service_1 = require("./database/typeorm-config.service");
const areaManager_1 = require("./common/areaManager");
areaManager_1.AreaManager.registerToArea('main', 'newPost');
areaManager_1.AreaManager.registerToArea('main', 'socialFeed');
require("./plugins/newPost.plugin");
require("./plugins/socialFeed.plugin");
const infrastructureDatabaseModule = typeorm_1.TypeOrmModule.forRootAsync({
    useClass: typeorm_config_service_1.TypeOrmConfigService,
    dataSourceFactory: async (options) => {
        const dataSource = new typeorm_2.DataSource({
            ...options,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
        });
        return dataSource.initialize();
    },
});
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [
                    database_config_1.default,
                    auth_config_1.default,
                    app_config_1.default,
                    mail_config_1.default,
                    file_config_1.default,
                    facebook_config_1.default,
                    google_config_1.default,
                    apple_config_1.default,
                ],
                envFilePath: ['.env'],
            }),
            infrastructureDatabaseModule,
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
                        infer: true,
                    }),
                    loaderOptions: {
                        path: path_1.default.join(__dirname, '/i18n/'),
                        watch: true,
                    },
                }),
                resolvers: [
                    {
                        use: nestjs_i18n_1.HeaderResolver,
                        useFactory: (configService) => [
                            configService.get('app.headerLanguage', { infer: true }),
                        ],
                        inject: [config_1.ConfigService],
                    },
                ],
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
            }),
            mail_module_1.MailModule,
            mailer_module_1.MailerModule,
            home_module_1.HomeModule,
            posts_module_1.PostsModule,
        ],
        controllers: [
            app_controller_1.AppController,
            auth_legacy_controller_1.AuthWebController,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map