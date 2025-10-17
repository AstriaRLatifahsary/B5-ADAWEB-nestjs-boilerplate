import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { setupViewEngine } from './common/viewEngine';
import { join } from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  app: any; // akan diisi dari main.ts

  @Get('/switch-theme')
  switchTheme(@Res() res: Response) {
    const configPath = join(__dirname, '..', 'config', 'theme.json');
    const themeConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const newTheme = themeConfig.theme === 'dark' ? 'default' : 'dark';
    themeConfig.theme = newTheme;

    fs.writeFileSync(configPath, JSON.stringify(themeConfig, null, 2));

    console.log(`🎨 Tema diubah ke: ${newTheme}`);

    if (this.app) setupViewEngine(this.app);

    // Kembali ke halaman utama
    return res.redirect('/');
  }
}
