import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1000;

  findAll(): Post[] {
    return this.posts;
  }

  create(dto: CreatePostDto): Post {
    const post: Post = {
      id: ++this.idCounter,
      username: dto.username || 'Anonymous',
      handle: dto.handle || '@' + (dto.username || 'anon').toLowerCase(),
      content: dto.content,
      image: dto.image,
      likes: 0,
      reposts: 0,
      comments: 0,
      time: 'baru saja',
      commentList: [],
    };
    this.posts.unshift(post);
    return post;
  }

  delete(id: number): boolean {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.posts.splice(idx, 1);
    return true;
  }

  update(id: number, payload: Partial<CreatePostDto>): Post | null {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const post = this.posts[idx];

    // Only allow updating content and image for now
    if (typeof payload.content !== 'undefined')
      post.content = payload.content as string;
    if (typeof payload.image !== 'undefined')
      post.image = payload.image as string;

    // Update time to indicate edited (simple label)
    post.time = 'baru saja';
    this.posts[idx] = post;
    return post;
  }
}
