import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ length: 100, nullable: true })
  location: string;

  @Column({ type: 'int', default: 0 })
  followersCount: number;

  @Column({ type: 'int', default: 0 })
  followingCount: number;
}
