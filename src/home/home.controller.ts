import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AreaManager } from '../common/areaManager';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get('/')
  async getHome(@Res() res: Response) {
    const message = this.service.getWelcomeMessage();
    const sidebarContent = await AreaManager.renderArea('sidebar');
    res.render('home', {
      title: 'Halaman Utama NestJS Boilerplate',
      message,
      sidebarContent,
      layout: 'layout',
    });
  }
}
