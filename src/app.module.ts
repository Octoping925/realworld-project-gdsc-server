import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [ArticleModule, CommentModule, FavoriteModule, UserModule, TagModule, FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
