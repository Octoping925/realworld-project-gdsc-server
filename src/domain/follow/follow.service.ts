import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow as FollowEntity } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  public async isFollowing(
    requestUserId: number | null,
    userId: number,
  ): Promise<boolean> {
    if (requestUserId === null) {
      return false;
    }

    return await this.followRepository.existsBy({
      followerId: requestUserId,
      followingId: userId,
    });
  }
}
