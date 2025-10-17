import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  // ✅ Endpoint API lama (jangan dihapus)
  @Get('/api/info')
  appInfo() {
    return this.service.appInfo();
  }

  // ✅ Endpoint baru untuk tampilan HTML (EJS)
  @Get('/')
  getHome(@Res() res: Response) {
    const message = this.service.getWelcomeMessage();
    return res.render('home', {
      title: 'Halaman Utama NestJS Boilerplate',
      message,
    });
  }
}
