import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleService } from '../article/article.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}

  public async getInfoByArticleId(
    requestUserId: number | null,
    articleId: number,
  ): Promise<{ favorited: boolean; favoritesCount: number }> {
    const favorited = await this.favoriteRepository.existsBy({
      userId: requestUserId,
      articleId,
    });

    const favoritesCount = await this.favoriteRepository.countBy({ articleId });

    return { favorited, favoritesCount };
  }

  public async favoriteArticle(requestUserId: number, slug: string) {
    const article = await this.articleService.findOneBySlug(
      requestUserId,
      slug,
    );

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const isAlreadyFavorited = await this.favoriteRepository.existsBy({
      userId: requestUserId,
      articleId: article.id,
    });

    if (isAlreadyFavorited) {
      throw new BadRequestException('Already favorited');
    }

    const favorite = new Favorite();
    favorite.userId = requestUserId;
    favorite.articleId = article.id;

    await this.favoriteRepository.save(favorite);
  }

  public async unfavoriteArticle(requestUserId: number, slug: string) {
    const articleId = await this.articleService.findIdBySlug(slug);

    await this.favoriteRepository.delete({
      userId: requestUserId,
      articleId,
    });
  }
}
