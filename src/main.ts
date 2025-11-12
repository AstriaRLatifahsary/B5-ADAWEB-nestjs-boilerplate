/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AreaManager } from './common/areaManager';
import { setupViewEngine } from './common/viewEngine';
import './plugins'; // mendaftarkan semua plugin
import './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // // 🔹 Aktifkan CORS agar bisa diakses oleh frontend
  // app.enableCors({
  //   origin: '*', // atau 'http://localhost:5173' jika pakai Vite
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // });

  app.enableCors({
    origin: '*', // atau http://localhost:3000 kalau mau lebih aman
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // 🔹 Parsing JSON & form body (untuk post request)
  app.useBodyParser('json');
  app.useBodyParser('urlencoded', { extended: true });

  // Folder public untuk file statis (CSS, JS, gambar)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Inisialisasi view engine sesuai tema aktif di config/theme.json
  setupViewEngine(app);

  // Get underlying express instance
  const server = app.getHttpAdapter().getInstance();

  // Setup session
  const session = require('express-session');
  server.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    }),
  );

  // Mount legacy auth routes
  try {
    const authRouter = require(join(process.cwd(), 'routes', 'auth'));
    server.use('/', authRouter);
    console.log('Mounted legacy auth routes at / (routes/auth.js)');
  } catch (err) {
    console.warn('Could not mount legacy auth routes automatically:', err);
  }

  // Inject instance app ke AppController
  const appController = app.get(AppController) as any;
  if (appController) appController.app = app;

  // Daftarkan plugin ke area layout
  AreaManager.registerToArea('sidebar', 'recentPosts');
  AreaManager.registerToArea('sidebar', 'recommendAccounts');
  AreaManager.registerToArea('nav-sidebar', 'navLinks');
  AreaManager.registerToArea('main', 'socialFeed');

  (global as any).AreaManager = AreaManager;

  await app.listen(3000);
  console.log('🚀 Aplikasi berjalan di http://localhost:3000');
}
void bootstrap();
