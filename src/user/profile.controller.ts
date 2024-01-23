import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ProfileDto } from './dto/profile.dto';
import { DUMMY_PROFILE } from './schema/profile.dummy.schema';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  public getProfile(): ProfileDto {
    return {
      profile: DUMMY_PROFILE,
    };
  }
}
