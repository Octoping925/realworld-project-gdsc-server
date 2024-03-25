import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ProfileDto } from '../user/dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NeedLogin } from '../../common/NeedLogin';
import { RequestUserId } from '../../auth/request-user-id';
import { ProfileService } from '../user/profile.service';

@ApiTags('Follows')
@Controller('profiles/:username/follow')
export class FollowController {
  constructor(
    private readonly followService: FollowService,
    private readonly profileService: ProfileService,
  ) {}

  @NeedLogin()
  @ApiOperation({ summary: '유저 팔로우' })
  @Post()
  public async followUser(
    @RequestUserId() requestUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileDto> {
    await this.followService.follow(requestUserId, username);

    const profile = await this.profileService.findByUsername(
      requestUserId,
      username,
    );

    return { profile };
  }

  @NeedLogin()
  @ApiOperation({ summary: '유저 팔로우 취소' })
  @Delete()
  public async unfollowUser(
    @RequestUserId() requestUserId: number,
    @Param('username') username: string,
  ): Promise<ProfileDto> {
    await this.followService.unfollow(requestUserId, username);

    const profile = await this.profileService.findByUsername(
      requestUserId,
      username,
    );

    return { profile };
  }
}
