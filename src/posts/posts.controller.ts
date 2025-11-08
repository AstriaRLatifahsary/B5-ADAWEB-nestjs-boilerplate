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
import { Post } from './interfaces/post.interface';

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
  remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const deleted = this.postsService.delete(Number(id));
    // postsService.delete returns Promise<boolean> or boolean depending on implementation; normalize
    return Promise.resolve(
      deleted instanceof Promise
        ? deleted.then((v) => ({ success: v }))
        : { success: deleted },
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: Partial<CreatePostDto>,
  ): Promise<Post> {
    const updated = await this.postsService.update(Number(id), body);
    // In this simple in-memory implementation, return the updated post or null
    return updated as Post;
  }
}
