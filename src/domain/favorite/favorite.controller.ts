import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { ArticleDto } from '../article/dto';
import { NeedLogin } from '../../common/NeedLogin';
import { RequestUserId } from '../../auth/request-user-id';
import { ArticleService } from '../article/article.service';

@ApiTags('Favorites')
@Controller('articles/:slug/favorite')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly articleService: ArticleService,
  ) {}

  @NeedLogin()
  @ApiOperation({ summary: '게시물 좋아요' })
  @Post()
  public async favoriteArticle(
    @RequestUserId() requestUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleDto> {
    await this.favoriteService.favoriteArticle(requestUserId, slug);

    const article = await this.articleService.findOneBySlug(
      requestUserId,
      slug,
    );

    return { article };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 좋아요 취소' })
  @Delete()
  public async unfavoriteArticle(
    @RequestUserId() requestUserId: number,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.favoriteService.unfavoriteArticle(requestUserId, slug);
  }
}
