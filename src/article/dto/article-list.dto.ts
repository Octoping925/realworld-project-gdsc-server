import { Article } from '../schema/article.schema';

export class ArticleListDto {
  articles: Article[];
  articlesCount: number;
}
