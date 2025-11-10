import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  handle: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  reposts: number;

  // 🔹 Tambahkan ini:
  @Column({ default: 0 })
  comments: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time_post: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
