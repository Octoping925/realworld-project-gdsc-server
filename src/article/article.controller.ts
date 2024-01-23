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
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleListDto } from './dto/article-list.dto';
import { ArticleDto } from './dto/article.dto';
import { DUMMY_ARTICLE } from './schema/article.dummy';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '피드 게시물 불러오기' })
  @Get('/feed')
  public getFeed(): ArticleListDto {
    return {
      articles: [DUMMY_ARTICLE, DUMMY_ARTICLE],
      articlesCount: 2,
    };
  }

  @ApiOperation({ summary: '최근 게시물 불러오기' })
  @Get()
  public getRecentArticles(): ArticleListDto {
    return {
      articles: [DUMMY_ARTICLE, DUMMY_ARTICLE],
      articlesCount: 2,
    };
  }

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

  @ApiOperation({ summary: '게시물 삭제' })
  @Delete(':slug')
  public removeArticle(@Param('slug') slug: string): void {
    this.articleService.remove(+slug);
  }
}
