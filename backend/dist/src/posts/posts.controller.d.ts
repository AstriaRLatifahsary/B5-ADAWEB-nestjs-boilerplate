import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(req: any): Promise<any[]>;
    create(dto: CreatePostDto, req: any): Promise<any>;
    update(id: number, dto: any, req: any): Promise<any>;
    delete(id: number, req: any): Promise<boolean>;
}
