import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppController } from './app.controller'; // ✅ tambahkan import ini
import { AppModule } from './app.module';
import { AreaManager } from './common/areaManager';
import { setupViewEngine } from './common/viewEngine';
import './plugins'; // register all plugins via side-effect

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

  // ✅ Register plugins to areas once at bootstrap (order matters)
  AreaManager.registerToArea('sidebar', 'recentPosts');
  AreaManager.registerToArea('sidebar', 'slideshow');

  await app.listen(3000);
  console.log('🚀 Aplikasi berjalan di http://localhost:3000');
}
void bootstrap();
