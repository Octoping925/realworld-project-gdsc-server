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
  public createArticle(@Body() createArticleDto: CreateArticleDto): ArticleDto {
    this.articleService.create(createArticleDto);

    return {
      article: DUMMY_ARTICLE,
    };
  }

  @ApiOperation({ summary: '게시물 조회' })
  @Get(':slug')
  public findArticle(@Param('slug') slug: string): ArticleDto {
    return {
      article: DUMMY_ARTICLE,
    };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 수정' })
  @Put(':slug')
  public updateArticle(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): ArticleDto {
    this.articleService.update(+slug, updateArticleDto);

    return {
      article: DUMMY_ARTICLE,
    };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 삭제' })
  @Delete(':slug')
  public removeArticle(@Param('slug') slug: string): void {
    this.articleService.remove(+slug);
  }
}
