import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'auth_user' })
export class AuthUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  username: string;

  @Column({ type: String, nullable: true })
  email?: string | null;

  @Column({ nullable: true })
  passwordHash?: string;

  @Column({ nullable: true })
  displayName?: string | null;

  @Column({ nullable: true })
  profilePhoto?: string | null;

  @Column({ type: 'int', default: 0 })
  followersCount: number;

  @Column({ type: 'int', default: 0 })
  followingCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
