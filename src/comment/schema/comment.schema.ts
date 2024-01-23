import { Profile } from '../../user/schema/profile.schema';

export class Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
}
