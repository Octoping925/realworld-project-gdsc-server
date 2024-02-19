import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';

@Entity('favorite')
export class Favorite extends CommonEntity {
  @Column()
  userId: number;

  @Column()
  articleId: number;
}
