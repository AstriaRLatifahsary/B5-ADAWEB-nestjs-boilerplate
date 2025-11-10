import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Req() req: any) {
    const posts = await this.postsService.findAll();

    // Debugging/logging: record what we are about to return so we can detect
    // any unexpected wrapping that may happen further down the pipeline.
    try {
      console.log(
        'GET /posts — accept:',
        req?.headers?.accept,
        ' | returning:',
        Array.isArray(posts) ? `${posts.length} items` : typeof posts,
      );
    } catch {
      // ignore logging errors
    }

    return posts;
  }

  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: any) {
    // derive user from session (legacy auth stores username string in req.session.user)
    const sessionUsername = req?.session?.user;
    return this.postsService.create(dto, sessionUsername);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: any, @Req() req: any) {
    const sessionUsername = req?.session?.user;
    return this.postsService.update(id, dto, sessionUsername);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: any) {
    const sessionUsername = req?.session?.user;
    return this.postsService.delete(id, sessionUsername);
  }
}
