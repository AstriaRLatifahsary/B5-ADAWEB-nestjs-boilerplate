export interface Post {
    id: number;
    name: string;
    username: string;
    content: string;
    image?: string;
    likes: number;
    reposts: number;
    comments: number;
    createdAt: string;
    commentList: any[];
}
