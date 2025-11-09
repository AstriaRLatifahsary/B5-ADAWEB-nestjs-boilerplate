import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '../entities/post.entity'; // ✅ ubah ke entity, bukan interface

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @HttpPost()
  create(@Body() dto: CreatePostDto): Promise<Post> {
    return this.postsService.create(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    await this.postsService.delete(Number(id));
    return { success: true }; // ✅ ubah, tidak perlu Promise.resolve
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreatePostDto>,
  ): Promise<Post> {
    const updated = await this.postsService.update(Number(id), body);
    return updated;
  }
}
