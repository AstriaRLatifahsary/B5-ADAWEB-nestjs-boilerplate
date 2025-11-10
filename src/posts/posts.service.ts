import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll(limit = 100): Promise<Post[]> {
    const posts = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
    console.log('📊 Jumlah data dari DB:', posts.length);
    return posts;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create({
      username: dto.username || 'Kamu',
      handle: dto.handle || '@' + (dto.username || 'anon').toLowerCase(),
      content: dto.content,
      image: dto.image,
      likes: 0,
      reposts: 0,
      comments: 0,
    });

    return await this.postRepository.save(newPost);
  }

  /**
   * 🔹 Update posting — hanya boleh dilakukan oleh pembuatnya
   */
  async update(id: number, dto: Partial<Post>): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post dengan ID ${id} tidak ditemukan`);
    }

    if (dto.username && dto.username !== post.username) {
      throw new ForbiddenException(
        '❌ Kamu tidak diizinkan mengedit postingan ini',
      );
    }

    await this.postRepository.update(id, { content: dto.content });

    // ✅ Pastikan return tidak null
    const updatedPost = await this.postRepository.findOneBy({ id });
    if (!updatedPost) {
      throw new NotFoundException(
        `Post dengan ID ${id} tidak ditemukan setelah update`,
      );
    }

    return updatedPost;
  }

  /**
   * 🔹 Hapus posting — hanya boleh dilakukan oleh pembuatnya
   */
  async delete(id: number, username?: string): Promise<boolean> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post dengan ID ${id} tidak ditemukan`);
    }

    if (username && username !== post.username) {
      throw new ForbiddenException(
        '❌ Kamu tidak diizinkan menghapus postingan ini',
      );
    }

    const result = await this.postRepository.delete(id);

    // ✅ Hindari error "possibly null"
    return (result.affected ?? 0) > 0;
  }
}
