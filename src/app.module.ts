import { Module } from '@nestjs/common';
import { ArticleModule } from './domain/article/article.module';
import { CommentModule } from './domain/comment/comment.module';
import { FavoriteModule } from './domain/favorite/favorite.module';
import { UserModule } from './domain/user/user.module';
import { TagModule } from './domain/tag/tag.module';
import { FollowModule } from './domain/follow/follow.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
