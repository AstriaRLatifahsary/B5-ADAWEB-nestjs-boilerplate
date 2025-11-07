/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller'; // menambahkan import appcontroller
import { AppModule } from './app.module';
import { AreaManager } from './common/areaManager';
import { setupViewEngine } from './common/viewEngine';
import './plugins'; // mendaftarkan semua plugin melalui side-effect

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Folder public untuk file statis (CSS, JS, gambar)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Inisialisasi view engine sesuai tema aktif di config/theme.json
  setupViewEngine(app);

  // Get underlying express instance so we can attach middleware used by express-style routers
  const server = app.getHttpAdapter().getInstance();

  // Configure express-session for demo/dev. For production, replace the store with Redis or DB-backed store.
  // require here to work in both ts-node and compiled builds
  const session = require('express-session');
  server.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    }),
  );

  // Note: legacy express-style auth router previously mounted here.
  // We've migrated auth routes into a Nest `AuthController` (src/auth) so the old router is no longer mounted.
  // Mount express-style auth router (routes/auth.js) so EJS views for login/register continue to work
  try {
    // require from project root to ensure JS file is found both in dev and production builds
    // use process.cwd() so path resolves correctly regardless of __dirname location
    const authRouter = require(join(process.cwd(), 'routes', 'auth'));
    server.use('/', authRouter);
    console.log('Mounted legacy auth routes at / (routes/auth.js)');
  } catch (err) {
    console.warn(
      'Could not mount legacy auth routes automatically:',
      err && err.message ? err.message : err,
    );
  }

  // Inject instance app ke AppController agar bisa reload view engine setelah switch theme
  const appController = app.get(AppController) as any;
  if (appController) {
    appController.app = app;
  }

  // Daftarkan plugin ke area “sidebar”
  AreaManager.registerToArea('sidebar', 'recentPosts');
  AreaManager.registerToArea('sidebar', 'recommendAccounts');
  // Daftarkan plugin ke area navigasi sidebar (drawer)
  AreaManager.registerToArea('nav-sidebar', 'navLinks');
  AreaManager.registerToArea('main', 'socialFeed');

  // expose AreaManager to mounted express routers (auth router, etc.)
  // so they can render area HTML when needed (used by routes/auth.js controllers)
  // attach to global to avoid import issues from plain JS files
  (global as any).AreaManager = AreaManager;

  await app.listen(3000);
  console.log('🚀 Aplikasi berjalan di http://localhost:3000');
}
void bootstrap();
