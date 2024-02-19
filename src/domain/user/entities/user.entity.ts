import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  @Generated('')
  id: number;

  @Column({ length: 30 })
  email: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 100, nullable: true })
  bio: string | null;

  @Column({ length: 100, nullable: true })
  image: string | null;
}
