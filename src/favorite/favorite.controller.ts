import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ArticleDto } from '../article/dto/article.dto';
import { DUMMY_ARTICLE } from '../article/schema/article.dummy';

@Controller('articles/:slug/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  public favoriteArticle(@Param('slug') slug: string): ArticleDto {
    return {
      article: DUMMY_ARTICLE,
    };
  }

  @Delete()
  public unfavoriteArticle(@Param('slug') slug: string): void {}
}
