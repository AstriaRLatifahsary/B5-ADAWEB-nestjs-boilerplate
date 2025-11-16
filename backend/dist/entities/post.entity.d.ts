import { AuthUser } from '../auth/auth-user.entity';
export declare class Post {
    id: number;
    content?: string;
    image?: string;
    likes: number;
    reposts: number;
    comments: number;
    user: AuthUser;
    quoteOf?: Post | null;
    createdAt: Date;
}
