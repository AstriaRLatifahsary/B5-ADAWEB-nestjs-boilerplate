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

  // Inject instance app ke AppController agar bisa reload view engine setelah switch theme
  const appController = app.get(AppController) as any;
  if (appController) {
    appController.app = app;
  }

  // Daftarkan plugin ke area “sidebar”
  AreaManager.registerToArea('sidebar', 'recentPosts');
  AreaManager.registerToArea('sidebar', 'slideshow');
  // Daftarkan plugin ke area navigasi sidebar (drawer)
  AreaManager.registerToArea('nav-sidebar', 'navLinks');

  await app.listen(3000);
  console.log('🚀 Aplikasi berjalan di http://localhost:3000');
}
void bootstrap();
