import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { FavoriteModule } from '../favorite/favorite.module';
import { FollowModule } from '../follow/follow.module';

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
