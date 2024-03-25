import { forwardRef, Module } from '@nestjs/common';
import { ArticleController, ArticleService, Article } from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { TagModule } from '../tag';
import { FavoriteModule } from '../favorite';
import { FollowModule } from '../follow';

@Module({
  imports: [
    UserModule,
    TagModule,
    FollowModule,
    forwardRef(() => FavoriteModule),
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
