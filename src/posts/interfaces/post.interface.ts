export interface Post {
  id: number;
  username: string;
  handle: string;
  content: string;
  image?: string;
  likes: number;
  reposts: number;
  comments: number;
  time: string;
  commentList: any[];
}
