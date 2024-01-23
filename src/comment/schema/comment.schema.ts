import { Profile } from '../../user/schema/profile.schema';

export type Comment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;
};
