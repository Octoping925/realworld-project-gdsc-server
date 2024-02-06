import { Comment } from '../schema/comment.schema';

export class CommentListDto {
  comments: Comment[];
  commentsCount: number;
}
