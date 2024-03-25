import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController, FavoriteService, Favorite } from '.';
import { ArticleModule } from '../article';

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
