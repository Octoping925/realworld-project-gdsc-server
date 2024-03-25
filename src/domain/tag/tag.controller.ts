import { Controller, Get } from '@nestjs/common';
import { TagService, TagListDto } from '.';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '인기 태그 불러오기' })
  @Get()
  public async findAllTag(): Promise<TagListDto> {
    const tags = await this.tagService.findAllTag();
    return { tags };
  }
}
