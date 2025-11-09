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
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AllConfigType } from './config/config.type';

// Register plugins to main area
AreaManager.registerToArea('main', 'newPost');
AreaManager.registerToArea('main', 'socialFeed');

// Import plugins
import './plugins/newPost.plugin';
import './plugins/socialFeed.plugin';

// ✅ Aktifkan database connection & buat tabel otomatis (dev mode)
const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    const dataSource = new DataSource({
      ...options,
      // ⬇️ Pastikan entity otomatis terdeteksi
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // ⬇️ Untuk development saja — otomatis create tabel
      synchronize: true,
      logging: true,
    });
    return dataSource.initialize();
  },
});

@Module({
  imports: [
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

    // ✅ Koneksi database
    infrastructureDatabaseModule,

    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
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
