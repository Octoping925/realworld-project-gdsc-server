import { Module } from '@nestjs/common';
import { CommentController, CommentService, Comment } from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { ArticleModule } from '../article';

@Module({
  imports: [UserModule, ArticleModule, TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
