// src/database/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AuthUser } from '../auth/auth-user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'admin_123',
  database: process.env.DATABASE_NAME || 'social_app',
  synchronize: true, // otomatis buat tabel
  logging: true, // aktifkan untuk debugging
  entities: [AuthUser], // pastikan entity diimpor dari auth-user.entity.ts
});
