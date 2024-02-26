import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './schema';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly followService: FollowService,
  ) {}

  public async findById(
    requestUserId: number | null,
    id: number,
  ): Promise<Profile> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    const isFollowing = await this.followService.isFollowing(
      requestUserId,
      user.id,
    );

    return Profile.fromEntity(user, isFollowing);
  }

  public async findByUsername(
    requestUserId: number | null,
    username: string,
  ): Promise<Profile> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const isFollowing = await this.followService.isFollowing(
      requestUserId,
      user.id,
    );

    return Profile.fromEntity(user, isFollowing);
  }
}
