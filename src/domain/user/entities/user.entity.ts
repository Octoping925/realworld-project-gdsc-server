import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/CommonEntity';
import { CreateUserDto } from '../dto';

@Entity('user')
export class User extends CommonEntity {
  @Column({ length: 30 })
  email: string;

  @Column({ length: 30 })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100, nullable: true })
  bio: string | null;

  @Column({ length: 100, nullable: true })
  image: string | null;

  public static of(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.user.username;
    user.email = createUserDto.user.email;
    user.password = createUserDto.user.password;
    return user;
  }
}
