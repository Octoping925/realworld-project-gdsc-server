import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import {
  CreateArticleDto,
  UpdateArticleDto,
  ArticleListDto,
  ArticleDto,
} from './dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NeedLogin } from '../../common/NeedLogin';
import { RequestUserId } from '../../auth/request-user-id';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @NeedLogin()
  @ApiOperation({ summary: '피드 게시물 불러오기' })
  @Get('/feed')
  public async getFeed(
    @RequestUserId() requestUserId: number,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<ArticleListDto> {
    const { articles, count } = await this.articleService.findFeed(
      requestUserId,
      offset,
      limit,
    );

    return {
      articles,
      articlesCount: count,
    };
  }

  @ApiOperation({ summary: '최근 게시물 불러오기' })
  @Get()
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'author', required: false })
  @ApiQuery({ name: 'favorited', required: false })
  public async getRecentArticles(
    @RequestUserId() requestUserId: number | null,
    @Query('tag') tag: string | null,
    @Query('author') author: string | null,
    @Query('favorited') favorited: string | null,
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<ArticleListDto> {
    const { articles, count } = await this.articleService.findRecent(
      requestUserId,
      tag,
      author,
      favorited,
      offset,
      limit,
    );

    return {
      articles,
      articlesCount: count,
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
