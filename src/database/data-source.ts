// src/database/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AuthUser } from '../auth/auth-user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [AuthUser],
});
