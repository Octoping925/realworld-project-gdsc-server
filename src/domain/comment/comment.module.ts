import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from '../user/user.module';
import { ArticleModule } from '../article/article.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    UserModule,
    ArticleModule,
    FavoriteModule,
    FollowModule,
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
