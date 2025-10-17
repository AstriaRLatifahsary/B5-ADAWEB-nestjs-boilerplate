import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get('/')
  getHome(@Res() res: Response) {
    const message = this.service.getWelcomeMessage();
    res.render('home', {
      title: 'Halaman Utama NestJS Boilerplate',
      message,
      layout: 'layout'
    });
  }
}
