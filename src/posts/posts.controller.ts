import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: any) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
