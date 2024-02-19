import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';

@Entity('article')
export class Article extends CommonEntity {
  @Column({ length: 100 })
  slug: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 10000 })
  body: string;

  @Column({ length: 100 })
  description: string;

  @Column()
  authorId: number;
}
