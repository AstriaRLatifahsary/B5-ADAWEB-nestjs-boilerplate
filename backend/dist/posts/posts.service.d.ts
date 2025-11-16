import { Repository } from 'typeorm';
import { AuthUser } from '../auth/auth-user.entity';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private readonly postRepository;
    private readonly authUserRepository;
    constructor(postRepository: Repository<Post>, authUserRepository: Repository<AuthUser>);
    findAll(limit?: number): Promise<any[]>;
    create(dto: CreatePostDto, sessionUsername?: string): Promise<any>;
    update(id: number, dto: Partial<Post>, sessionUsername?: string): Promise<any>;
    delete(id: number, sessionUsername?: string): Promise<boolean>;
}
