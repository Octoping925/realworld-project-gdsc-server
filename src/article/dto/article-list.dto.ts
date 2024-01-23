import { Article } from '../schema/article.schema';

export type ArticleListDto = {
  articles: Article[];
  articlesCount: number;
};
