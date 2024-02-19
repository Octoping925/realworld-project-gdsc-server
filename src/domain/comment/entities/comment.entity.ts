import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';

@Entity('comment')
export class Comment extends CommonEntity {
  @Column()
  userId: number;

  @Column()
  articleId: number;

  @Column({ length: 10000 })
  body: string;
}
