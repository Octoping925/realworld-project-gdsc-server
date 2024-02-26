import { Injectable } from '@nestjs/common';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
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
}
