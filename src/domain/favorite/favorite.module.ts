import { forwardRef, Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [
    forwardRef(() => ArticleModule),
    TypeOrmModule.forFeature([Favorite]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
