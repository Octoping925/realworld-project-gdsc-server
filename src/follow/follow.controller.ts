import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ProfileDto } from '../user/dto/profile.dto';
import { DUMMY_PROFILE } from '../user/schema/profile.dummy.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Follows')
@Controller('profiles/:username/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @ApiOperation({ summary: '유저 팔로우' })
  @Post()
  public followUser(@Param('username') username: string): ProfileDto {
    // this.followService.create(+id);

    return {
      profile: DUMMY_PROFILE,
    };
  }

  @ApiOperation({ summary: '유저 팔로우 취소' })
  @Delete()
  public unfollowUser(@Param('username') username: string): ProfileDto {
    // this.followService.remove(+username);

    return {
      profile: DUMMY_PROFILE,
    };
  }
}
