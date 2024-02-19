import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';

@Entity('follow')
export class Follow extends CommonEntity {
  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
