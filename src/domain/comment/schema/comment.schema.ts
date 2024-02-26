import { Profile } from '../../user/schema';
import { Comment as CommentEntity } from '../entities/comment.entity';

export class Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: Profile;

  static fromEntity(commentEntity: CommentEntity, author: Profile) {
    const comment = new Comment();
    comment.id = commentEntity.id;
    comment.createdAt = commentEntity.createdAt;
    comment.updatedAt = commentEntity.updatedAt;
    comment.body = commentEntity.body;
    comment.author = author;

    return comment;
  }
}
