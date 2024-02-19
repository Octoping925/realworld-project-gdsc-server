import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';

@Entity('tag')
export class Tag extends CommonEntity {
  @Column({ length: 100 })
  name: string;
}
