import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileService, ProfileDto } from '.';
import { RequestUserId } from '../../auth';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: '프로필 조회' })
  @Get(':username')
  public async getProfile(
    @RequestUserId() requestUserId: number | null,
    @Param('username') username: string,
  ): Promise<ProfileDto> {
    const profile = await this.profileService.findByUsername(
      requestUserId,
      username,
    );

    return { profile };
  }
}
