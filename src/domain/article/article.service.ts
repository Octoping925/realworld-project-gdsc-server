import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Article } from './schema/article.schema';
import {
  Article as ArticleEntity,
  CreateArticleDto,
  UpdateArticleDto,
} from '.';
import { TagService } from '../tag';
import { FollowService } from '../follow';
import { FavoriteService } from '../favorite';
import { ProfileService, UserService } from '../user';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly tagService: TagService,
    private readonly profileService: ProfileService,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
    private readonly followService: FollowService,
    private readonly userService: UserService,
  ) {}

  public async create(
    requestUserId: number,
    dto: CreateArticleDto,
  ): Promise<number> {
    const articleEntity = new ArticleEntity();
    articleEntity.slug = this.slugify(dto.article.title);
    articleEntity.title = dto.article.title;
    articleEntity.body = dto.article.body;
    articleEntity.description = dto.article.description;
    articleEntity.authorId = requestUserId;

    await this.articleRepository.save(articleEntity);

    return articleEntity.id;
  }

  public async findOne(
    requestUserId: number | null,
    articleId: number,
  ): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id: articleId });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.getArticleInfo(requestUserId, article);
  }

  public async findOneBySlug(requestUserId: number, slug: string) {
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return this.getArticleInfo(requestUserId, article);
  }

  public async findIdBySlug(slug: string): Promise<number> {
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article.id;
  }

  private async getArticleInfo(
    requestUserId: number | null,
    article: ArticleEntity,
  ): Promise<Article> {
    const tags = await this.tagService.findByArticleId(article.id);
    const authorEntity = await this.profileService.findById(
      requestUserId,
      article.authorId,
    );

    const { favorited, favoritesCount } =
      await this.favoriteService.getInfoByArticleId(requestUserId, article.id);

    return Article.fromEntity(
      article,
      tags,
      authorEntity,
      favorited,
      favoritesCount,
    );
  }

  public async update(
    requestUserId: number,
    slug: string,
    dto: UpdateArticleDto,
  ): Promise<void> {
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== requestUserId) {
      throw new ForbiddenException('권한이 없습니다');
    }

    await this.articleRepository.update(article.id, {
      title: dto.article.title,
      description: dto.article.description,
      body: dto.article.body,
    });
  }

  public async remove(requestUserId: number, slug: string): Promise<void> {
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== requestUserId) {
      throw new ForbiddenException('권한이 없습니다');
    }

    await this.articleRepository.remove(article);
  }

  public async findFeed(
    requestUserId: number,
    offset: number,
    limit: number,
  ): Promise<{ articles: Article[]; count: number }> {
    const followerIds = await this.followService.getFollowerIds(requestUserId);

    if (followerIds.length === 0) {
      return {
        articles: [],
        count: 0,
      };
    }

    const articles = await this.articleRepository.find({
      where: { authorId: In(followerIds) },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    const articleCount = await this.articleRepository.count({
      where: { authorId: In(followerIds) },
    });

    return {
      articles: await Promise.all(
        articles.map((article) => this.getArticleInfo(requestUserId, article)),
      ),
      count: articleCount,
    };
  }

  public async findRecent(
    requestUserId: number | null,
    tag: string | undefined,
    author: string | undefined,
    favorited: string | undefined,
    offset: number,
    limit: number,
  ): Promise<{ articles: Article[]; count: number }> {
    let targetArticleIds: number[] | null = null;
    let targetAuthorId: number | null = null;

    if (tag) {
      const tags = await this.tagService.findByTagName(tag);
      const articleIds = tags.map((tag) => tag.articleId);
      targetArticleIds = [...(targetArticleIds ?? []), ...articleIds];
    }

    if (author) {
      targetAuthorId = (await this.userService.findByUsername(author)).id;
    }

    if (favorited) {
      const favoritedUserId = (await this.userService.findByUsername(favorited))
        .id;
      const favorites =
        await this.favoriteService.findAllByUserId(favoritedUserId);

      const favoritedArticleIds = favorites.map(
        (favorite) => favorite.articleId,
      );

      targetArticleIds = [...(targetArticleIds ?? []), ...favoritedArticleIds];
    }

    const whereOption = {};
    if (targetArticleIds !== null) {
      whereOption['id'] = In(targetArticleIds);
    }

    if (targetAuthorId) {
      whereOption['authorId'] = targetAuthorId;
    }

    const articles = await this.articleRepository.find({
      where: whereOption,
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    const articleCount = await this.articleRepository.count({
      where: whereOption,
    });

    return {
      articles: await Promise.all(
        articles.map((article) => this.getArticleInfo(requestUserId, article)),
      ),
      count: articleCount,
    };
  }

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}
