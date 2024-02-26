import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow as FollowEntity } from './entities/follow.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
    private readonly userService: UserService,
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

  public async follow(requestUserId: number, username: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (requestUserId === user.id) {
      throw new BadRequestException('You cannot follow yourself');
    }

    const isAlreadyFollowing = await this.isFollowing(requestUserId, user.id);
    if (isAlreadyFollowing) {
      throw new BadRequestException('Already following');
    }

    const follow = new FollowEntity();
    follow.followerId = requestUserId;
    follow.followingId = user.id;

    await this.followRepository.save(follow);
  }

  public async unfollow(requestUserId: number, username: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.followRepository.delete({
      followerId: requestUserId,
      followingId: user.id,
    });
  }
}
