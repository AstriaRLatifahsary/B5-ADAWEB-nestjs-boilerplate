import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  // `name` = full name of the poster
  @Column()
  name: string;

  //username (e.g. @elonmusk)
  @Column()
  username: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  reposts: number;

  // 🔹 Tambahkan ini:
  @Column({ default: 0 })
  comments: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
