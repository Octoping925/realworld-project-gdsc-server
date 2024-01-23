import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileDto } from './dto/profile.dto';
import { DUMMY_PROFILE } from './schema/profile.dummy.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '프로필 조회' })
  @Get(':username')
  public getProfile(): ProfileDto {
    return {
      profile: DUMMY_PROFILE,
    };
  }
}
