import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AreaManager } from '../common/areaManager';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller()
export class HomeController {
  constructor(private service: HomeService) {}

  @Get(['/', '/home'])
  async getHome(@Res() res: Response) {
    const message = this.service.getWelcomeMessage();
    const sidebarContent = await AreaManager.renderArea('sidebar');
    const navSidebarContent = await AreaManager.renderArea('nav-sidebar');
    const mainContent = await AreaManager.renderArea('main');

    res.render('home', {
      title: 'Halaman Utama Sosial Media Mini',
      message,
      sidebarContent,
      navSidebarContent,
      mainContent,
      layout: 'layout',
    });
  }
}
