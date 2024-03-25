import { User as UserEntity } from '../entities/user.entity';
import { User } from './user.schema';

export class Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;

  static fromEntity(user: UserEntity, isFollowing: boolean): Profile {
    const profile = new Profile();
    profile.username = user.username;
    profile.bio = user.bio;
    profile.image = user.image;
    profile.following = isFollowing;

    return profile;
  }

  static fromUserSchema(user: User, isFollowing: boolean): Profile {
    const profile = new Profile();
    profile.username = user.username;
    profile.bio = user.bio;
    profile.image = user.image;
    profile.following = isFollowing;

    return profile;
  }
}
