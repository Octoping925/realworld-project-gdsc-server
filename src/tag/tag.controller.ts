import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagListDto } from './dto/tag-list.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '인기 태그 불러오기' })
  @Get()
  public findAllTag(): TagListDto {
    return {
      tags: ['tag1', 'tag2'],
    };
  }
}
