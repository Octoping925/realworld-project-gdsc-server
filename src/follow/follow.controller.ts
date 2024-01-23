import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ProfileDto } from '../user/dto/profile.dto';
import { DUMMY_PROFILE } from '../user/schema/profile.dummy.schema';

@Controller('profiles/:username/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  public followUser(@Param('username') username: string): ProfileDto {
    // this.followService.create(+id);

    return {
      profile: DUMMY_PROFILE,
    };
  }

  @Delete()
  public unfollowUser(@Param('username') username: string): ProfileDto {
    // this.followService.remove(+username);

    return {
      profile: DUMMY_PROFILE,
    };
  }
}
