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

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/feed')
  public getFeed(): ArticleListDto {
    return {
      articles: [DUMMY_ARTICLE, DUMMY_ARTICLE],
      articlesCount: 2,
    };
  }

  @Get()
  public getRecentArticles(): ArticleListDto {
    return {
      articles: [DUMMY_ARTICLE, DUMMY_ARTICLE],
      articlesCount: 2,
    };
  }

  @Post()
  public createArticle(@Body() createArticleDto: CreateArticleDto): ArticleDto {
    this.articleService.create(createArticleDto);

    return {
      article: DUMMY_ARTICLE,
    };
  }

  @Get(':slug')
  public findArticle(@Param('slug') slug: string): ArticleDto {
    return {
      article: DUMMY_ARTICLE,
    };
  }

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

  @Delete(':slug')
  public removeArticle(@Param('slug') slug: string): void {
    this.articleService.remove(+slug);
  }
}
