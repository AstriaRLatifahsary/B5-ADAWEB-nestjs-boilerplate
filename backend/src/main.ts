/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { AreaManager } from './common/areaManager';
import { setupViewEngine } from './common/viewEngine';
import './plugins';
import './database/data-source';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- CORS ---
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // --- BODY PARSER ---
  app.useBodyParser('json');
  app.useBodyParser('urlencoded', { extended: true });

  // --- STATIC FILES ---
  app.useStaticAssets(join(process.cwd(), '..', 'frontend', 'public'));

  // --- SESSION (HARUS sebelum view engine & router!) ---
  const session = require('express-session');
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'dev-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
    }),
  );

  // --- VIEW ENGINE ---
  setupViewEngine(app);

  // --- AREA MANAGER (tambahan plugin layout) ---
  AreaManager.registerToArea('sidebar', 'recentPosts');
  AreaManager.registerToArea('sidebar', 'recommendAccounts');
  AreaManager.registerToArea('nav-sidebar', 'navLinks');
  AreaManager.registerToArea('main', 'socialFeed');

  (global as any).AreaManager = AreaManager;

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`🚀 Aplikasi berjalan di http://localhost:${port}`);
}
bootstrap();
