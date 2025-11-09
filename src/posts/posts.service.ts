import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Ambil semua post
   */
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  /**
   * Buat post baru
   */
  async create(dto: CreatePostDto): Promise<Post> {
    const newPost = this.postRepository.create({
      username: dto.username || 'Anonymous',
      handle: dto.handle || '@' + (dto.username || 'anon').toLowerCase(),
      content: dto.content,
      image: dto.image,
    });

    return await this.postRepository.save(newPost);
  }

  /**
   * Update data post
   */
  async update(id: number, dto: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, dto);
    const updatedPost = await this.postRepository.findOneBy({ id });

    if (!updatedPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return updatedPost;
  }

  /**
   * Hapus post berdasarkan ID
   */
  async delete(id: number): Promise<boolean> {
    const result = await this.postRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return true; // ✅ return boolean agar cocok dengan controller
  }
}
