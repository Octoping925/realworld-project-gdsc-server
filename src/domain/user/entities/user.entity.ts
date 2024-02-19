import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';

@Entity('user')
export class User extends CommonEntity {
  @Column({ length: 30 })
  email: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 100, nullable: true })
  bio: string | null;

  @Column({ length: 100, nullable: true })
  image: string | null;
}
