import { User as UserEntity } from '../entities/user.entity';

export class User {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  image: string | null;

  public static fromEntity(userEntity: UserEntity): User {
    const user = new User();
    user.id = userEntity.id;
    user.email = userEntity.email;
    user.username = userEntity.username;
    user.bio = userEntity.bio;
    user.image = userEntity.image;
    return user;
  }
}
