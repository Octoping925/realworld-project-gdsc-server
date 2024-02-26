import { Profile } from '../../user/schema/profile.schema';
import { Tag } from '../../tag/schema/Tag';
import { Article as ArticleEntity } from '../entities/article.entity';

export class Article {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;

  static fromEntity(
    articleEntity: ArticleEntity,
    tags: Tag[],
    author: Profile,
    favorited: boolean,
    favoritesCount: number,
  ) {
    const article = new Article();
    article.id = articleEntity.id;
    article.slug = articleEntity.slug;
    article.title = articleEntity.title;
    article.description = articleEntity.description;
    article.body = articleEntity.body;
    article.tagList = tags;
    article.createdAt = articleEntity.createdAt;
    article.updatedAt = articleEntity.updatedAt;
    article.favorited = favorited;
    article.favoritesCount = favoritesCount;
    article.author = author;

    return article;
  }
}
