import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagListDto } from './dto/tag-list.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  public findAllTag(): TagListDto {
    return {
      tags: ['tag1', 'tag2'],
    };
  }
}
