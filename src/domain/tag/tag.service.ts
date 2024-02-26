import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag as TagEntity } from './entities/tag.entity';
import { Tag } from './schema/Tag';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  public async findByArticleId(articleId: number): Promise<Tag[]> {
    const tags = await this.tagRepository.findBy({ articleId });
    return tags.map((tag) => tag.name);
  }

  public async save(articleId: number, tagNames: string[]): Promise<void> {
    const tags = tagNames.map((name) => {
      const tag = new TagEntity();
      tag.articleId = articleId;
      tag.name = name;
      return tag;
    });

    await this.tagRepository.save(tags);
  }
}
