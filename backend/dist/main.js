"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const areaManager_1 = require("./common/areaManager");
const viewEngine_1 = require("./common/viewEngine");
require("./plugins");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.useBodyParser('json');
    app.useBodyParser('urlencoded', { extended: true });
    app.useStaticAssets((0, path_1.join)(process.cwd(), '..', 'frontend', 'public'));
    const session = require('express-session');
    app.use(session({
        secret: process.env.SESSION_SECRET || 'dev-session-secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    }));
    (0, viewEngine_1.setupViewEngine)(app);
    try {
        const appController = app.get(app_controller_1.AppController);
        appController.app = app;
    }
    catch { }
    areaManager_1.AreaManager.registerToArea('sidebar', 'recentPosts');
    areaManager_1.AreaManager.registerToArea('sidebar', 'recommendAccounts');
    areaManager_1.AreaManager.registerToArea('nav-sidebar', 'navLinks');
    areaManager_1.AreaManager.registerToArea('main', 'socialFeed');
    global.AreaManager = areaManager_1.AreaManager;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port);
    console.log(`🚀 Aplikasi berjalan di http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map