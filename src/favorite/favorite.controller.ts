import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ArticleDto } from '../article/dto/article.dto';
import { DUMMY_ARTICLE } from '../article/schema/article.dummy';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('articles/:slug/favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: '게시물 좋아요' })
  @Post()
  public favoriteArticle(@Param('slug') slug: string): ArticleDto {
    return {
      article: DUMMY_ARTICLE,
    };
  }

  @ApiOperation({ summary: '게시물 좋아요 취소' })
  @Delete()
  public unfavoriteArticle(@Param('slug') slug: string): void {}
}
