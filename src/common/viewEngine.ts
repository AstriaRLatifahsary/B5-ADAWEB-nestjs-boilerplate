import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import themeConfig from '../config/theme.json'; // pastikan path-nya benar

export function setupViewEngine(app: NestExpressApplication) {
  const activeTheme = themeConfig.theme || 'default';
  app.setBaseViewsDir(
    join(__dirname, '..', '..', 'themes', activeTheme, 'views'),
  );
  app.setViewEngine('ejs');
}
