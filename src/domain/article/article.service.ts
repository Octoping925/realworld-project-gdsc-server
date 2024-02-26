import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { Article } from './schema/article.schema';
import { Article as ArticleEntity } from './entities/article.entity';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { FollowService } from '../follow/follow.service';
import { FavoriteService } from '../favorite/favorite.service';
import { ProfileService } from '../user/profile.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly followService: FollowService,
    private readonly favoriteService: FavoriteService,
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
      throw new Error('Article not found');
    }

    return this.getArticleInfo(requestUserId, article);
  }

  public async findOneBySlug(requestUserId: number, slug: string) {
    const article = await this.articleRepository.findOneBy({ slug });

    if (!article) {
      throw new Error('Article not found');
    }

    return this.getArticleInfo(requestUserId, article);
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
      throw new Error('Article not found');
    }

    if (article.authorId !== requestUserId) {
      throw new Error('권한이 없습니다');
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
      throw new Error('Article not found');
    }

    if (article.authorId !== requestUserId) {
      throw new Error('권한이 없습니다');
    }

    await this.articleRepository.remove(article);
  }

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}
