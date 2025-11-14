import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from '../auth/auth-user.entity';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(AuthUser)
    private readonly authUserRepository: Repository<AuthUser>,
  ) {}

  async findAll(limit = 100): Promise<Post[]> {
    const posts = await this.postRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
    console.log('📊 Jumlah data dari DB:', posts.length);
    return posts;
  }

  /**
   * Create a post. If sessionUsername is provided we will derive name and username
   * from the users table (trusted server-side source) instead of relying on client data.
   */
  async create(dto: CreatePostDto, sessionUsername?: string): Promise<Post> {
    let name = dto.name || dto.username || 'Kamu';
    let usernameHandle = dto.username || '';

    if (sessionUsername) {
      try {
        const user = await this.authUserRepository.findOne({
          where: { username: sessionUsername },
        });
        if (user) {
          name = user.displayName || user.username || name;
          usernameHandle = user.username || usernameHandle;
        }
      } catch (err) {
        // ignore and fallback to dto values
        void err;
      }
    }

    // normalize handle to start with @
    if (usernameHandle && !String(usernameHandle).startsWith('@')) {
      usernameHandle = '@' + String(usernameHandle);
    } else if (!usernameHandle) {
      usernameHandle =
        '@' + String((name || 'anon').replace(/\s+/g, '').toLowerCase());
    }

    const newPost = this.postRepository.create({
      name,
      username: usernameHandle,
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
  async update(
    id: number,
    dto: Partial<Post>,
    sessionUsername?: string,
  ): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post dengan ID ${id} tidak ditemukan`);
    }

    // Authorization: verify the requester (by session username) is the post owner
    if (sessionUsername) {
      const expectedHandle = String(sessionUsername).startsWith('@')
        ? sessionUsername
        : '@' + sessionUsername;
      if (expectedHandle !== post.username) {
        throw new ForbiddenException(
          '❌ Kamu tidak diizinkan mengedit postingan ini',
        );
      }
    } else if (dto.username && dto.username !== post.username) {
      // fallback: if no session provided, still prevent someone from changing owner via payload
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
  async delete(id: number, sessionUsername?: string): Promise<boolean> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post dengan ID ${id} tidak ditemukan`);
    }
    // Validate requester matches the post owner using session username
    if (sessionUsername) {
      const expectedHandle = String(sessionUsername).startsWith('@')
        ? sessionUsername
        : '@' + sessionUsername;
      if (expectedHandle !== post.username) {
        throw new ForbiddenException(
          '❌ Kamu tidak diizinkan menghapus postingan ini',
        );
      }
    }

    const result = await this.postRepository.delete(id);

    // ✅ Hindari error "possibly null"
    return (result.affected ?? 0) > 0;
  }
}
