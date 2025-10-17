import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import expressLayouts from 'express-ejs-layouts'; // ❗ Tanpa tanda *

export function setupViewEngine(app: NestExpressApplication) {
  const configPath = join(__dirname, '..', '..', 'config', 'theme.json');
  const themeConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const activeTheme = themeConfig.theme || 'default';

  console.log(`✅ Tema aktif: ${activeTheme}`);

  app.setBaseViewsDir(join(__dirname, '..', '..', 'themes', activeTheme, 'views'));
  app.setViewEngine('ejs');
  app.use(expressLayouts); // ✅ gunakan default import
  app.set('layout', 'layout');
}
