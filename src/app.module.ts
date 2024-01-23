import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [ArticleModule, CommentModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
