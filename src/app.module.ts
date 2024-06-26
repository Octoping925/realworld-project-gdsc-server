import { Module } from '@nestjs/common';
import { ArticleModule } from './domain/article/article.module';
import { CommentModule } from './domain/comment/comment.module';
import { FavoriteModule } from './domain/favorite/favorite.module';
import { UserModule } from './domain/user/user.module';
import { TagModule } from './domain/tag/tag.module';
import { FollowModule } from './domain/follow/follow.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config(
  process.env.NODE_ENV === 'production'
    ? { path: '.env' }
    : { path: '.env.development' },
);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: true,
    }),
    ArticleModule,
    CommentModule,
    FavoriteModule,
    UserModule,
    TagModule,
    FollowModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
