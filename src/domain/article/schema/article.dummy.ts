import { Article } from './article.schema';

export const DUMMY_ARTICLE: Article = {
  id: 1,
  slug: 'dummy-article',
  title: 'dummy-article-title',
  description: 'dummy-description',
  body: 'dummy-body',
  tagList: ['react', 'nodejs'],
  createdAt: new Date(),
  updatedAt: new Date(),
  favorited: false,
  favoritesCount: 12,
  author: {
    username: 'dummyusername',
    bio: 'dummy-bio',
    image: null,
    following: true,
  },
};
