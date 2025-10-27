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
    const navSidebarContent = await AreaManager.renderArea('nav-sidebar');
    
    // 🧩 Tambahkan data thread dummy dulu
    const threads = [
      {
        userAvatar: 'https://i.pravatar.cc/45?img=1',
        username: 'Astria R. Latifahsary',
        date: '27 Oktober 2025',
        content: 'Selamat datang di forum Sidanus! Ini adalah postingan pertama 🎉',
        likes: 23,
        replies: 5,
        reposts: 2,
      },
      {
        userAvatar: 'https://i.pravatar.cc/45?img=2',
        username: 'Mahasiswa Teknik',
        date: '27 Oktober 2025',
        content: 'Boilerplate ini keren banget buat belajar NestJS! 🔥',
        likes: 15,
        replies: 3,
        reposts: 1,
      },
    ];
    
    // ⬇️ threads perlu dikirim ke view agar bisa dirender di home.ejs
    res.render('home', {
      title: 'Halaman Utama NestJS Boilerplate',
      message,
      threads, // 🔥 ini yang belum ada sebelumnya
      sidebarContent,
      navSidebarContent,
      layout: 'layout',
    });
  }
}
