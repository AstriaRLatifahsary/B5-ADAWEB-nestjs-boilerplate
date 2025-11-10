import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';

import appleConfig from './auth-apple/config/apple.config';
import facebookConfig from './auth-facebook/config/facebook.config';
import googleConfig from './auth-google/config/google.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import fileConfig from './files/config/file.config';
import mailConfig from './mail/config/mail.config';

import { HeaderResolver, I18nModule } from 'nestjs-i18n';

import { HomeModule } from './home/home.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';

import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';

import { AreaManager } from './common/areaManager';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';

// ✅ Register plugin ke area main
AreaManager.registerToArea('main', 'newPost');
AreaManager.registerToArea('main', 'socialFeed');

// ✅ Load plugin
import './plugins/newPost.plugin';
import './plugins/socialFeed.plugin';

// ✅ Koneksi Database
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'mysql',
      host: config.get('database.host'),
      port: config.get('database.port'),
      username: config.get('database.username'),
      password: config.get('database.password'),
      database: config.get('database.name'),

      // ✅ Auto load semua entity .entity.ts
      autoLoadEntities: true,

      // ✅ Development only
      synchronize: true,
      logging: true,
    } as DataSourceOptions;
  },
  dataSourceFactory: async (options: DataSourceOptions) => {
    const ds = new DataSource(options);
    return ds.initialize();
  },
});

@Module({
  imports: [
    // ✅ Environment Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        facebookConfig,
        googleConfig,
        appleConfig,
      ],
      envFilePath: ['.env'],
    }),

    infrastructureDatabaseModule,

    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => {
        const appConfig = configService.get('app', { infer: true });
        return {
          fallbackLanguage: appConfig?.fallbackLanguage || 'en',
          loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
        };
      },
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            const appConfig = configService.get('app', { infer: true });
            return [appConfig?.headerLanguage || 'x-custom-lang'];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),

    MailModule,
    MailerModule,
    HomeModule,
    PostsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
