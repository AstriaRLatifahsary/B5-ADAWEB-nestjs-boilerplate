import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from '../entities/post.entity';

@Module({
  imports: [
    // 🔹 Mendaftarkan entity Post agar bisa diakses lewat Repository di service
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [
    // 🔹 Mengatur endpoint /api/posts
    PostsController,
  ],
  providers: [
    // 🔹 Menyediakan logika bisnis untuk operasi CRUD
    PostsService,
  ],
  exports: [
    // 🔹 Agar PostsService bisa digunakan di module lain (misalnya FeedModule)
    PostsService,
    TypeOrmModule,
  ],
})
export class PostsModule {}
