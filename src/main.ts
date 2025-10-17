import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { setupViewEngine } from './common/viewEngine';
import { AppController } from './app.controller'; // ✅ tambahkan import ini

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ✅ Folder public untuk file statis (CSS, JS, gambar)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // ✅ Inisialisasi view engine sesuai tema aktif di config/theme.json
  setupViewEngine(app);

  // ✅ Inject instance app ke AppController agar bisa reload view engine setelah switch theme
  const appController = app.get(AppController) as any;
  if (appController) {
    appController.app = app;
  }

  await app.listen(3000);
  console.log('🚀 Aplikasi berjalan di http://localhost:3000');
}
bootstrap();
