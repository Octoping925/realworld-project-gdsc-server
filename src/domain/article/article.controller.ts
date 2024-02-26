import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleListDto,
  ArticleDto,
} from './dto';
import { DUMMY_ARTICLE } from './schema/article.dummy';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NeedLogin } from '../../common/NeedLogin';
import { RequestUserId } from '../../auth/request-user-id';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @NeedLogin()
  @ApiOperation({ summary: '피드 게시물 불러오기' })
  @Get('/feed')
  public getFeed(
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ): ArticleListDto {
    return {
      articles: [DUMMY_ARTICLE, DUMMY_ARTICLE],
      articlesCount: 2,
    };
  }

  @ApiOperation({ summary: '최근 게시물 불러오기' })
  @Get()
  public getRecentArticles(
    @Param('tag') tag: string,
    @Param('author') author: string,
    @Param('favorited') favorited: string,
    @Param('offset') offset: number,
    @Param('limit') limit: number,
  ): ArticleListDto {
    return {
      articles: [DUMMY_ARTICLE, DUMMY_ARTICLE],
      articlesCount: 2,
    };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 생성' })
  @Post()
  public async createArticle(
    @RequestUserId() requestUserId: number,
    @Body() dto: CreateArticleDto,
  ): Promise<ArticleDto> {
    const articleId = await this.articleService.create(requestUserId, dto);
    const article = await this.articleService.findOne(requestUserId, articleId);

    return { article };
  }

  @ApiOperation({ summary: '게시물 조회' })
  @Get(':slug')
  public async findArticle(
    @RequestUserId() requestUserId: number | null, // 로그인이 안되어있을 경우?
    @Param('slug') slug: string,
  ): Promise<ArticleDto> {
    const article = await this.articleService.findOneBySlug(
      requestUserId,
      slug,
    );

    return { article };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 수정' })
  @Put(':slug')
  public async updateArticle(
    @RequestUserId() requestUserId: number,
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleDto> {
    await this.articleService.update(requestUserId, slug, updateArticleDto);

    const article = await this.articleService.findOneBySlug(
      requestUserId,
      slug,
    );

    return { article };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 삭제' })
  @Delete(':slug')
  public async removeArticle(
    @RequestUserId() requestUserId: number,
    @Param('slug') slug: string,
  ): Promise<void> {
    await this.articleService.remove(requestUserId, slug);
  }
}
