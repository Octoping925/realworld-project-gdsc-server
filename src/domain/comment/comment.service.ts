import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment as CommentEntity, CreateCommentDto } from '.';
import { ArticleService } from '../article';
import { Comment } from './schema/comment.schema';
import { ProfileService } from '../user';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
    private readonly profileService: ProfileService,
  ) {}

  public async findByArticleSlug(
    requestUserId: number | null,
    slug: string,
  ): Promise<{ comments: Comment[]; count: number }> {
    const articleId = await this.articleService.findIdBySlug(slug);
    const comments = await this.commentRepository.findBy({ articleId });

    const authors = await Promise.all(
      comments.map(
        async (c) =>
          await this.profileService.findById(requestUserId, c.userId),
      ),
    );

    const commentCount = await this.commentRepository.countBy({ articleId });

    return {
      comments: comments.map((comment, idx) =>
        Comment.fromEntity(comment, authors[idx]),
      ),
      count: commentCount,
    };
  }

  public async findById(requestUserId: number | null, commentId: number) {
    const comment = await this.commentRepository.findOneBy({
      id: commentId,
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const author = await this.profileService.findById(
      requestUserId,
      comment.userId,
    );

    return Comment.fromEntity(comment, author);
  }

  public async create(
    requestUserId: number,
    slug: string,
    dto: CreateCommentDto,
  ): Promise<number> {
    const articleId = await this.articleService.findIdBySlug(slug);

    const comment = new CommentEntity();
    comment.userId = requestUserId;
    comment.body = dto.comment.body;
    comment.articleId = articleId;

    await this.commentRepository.save(comment);

    return comment.id;
  }

  public async remove(requestUserId: number, commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOneBy({
      id: commentId,
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== requestUserId) {
      throw new ForbiddenException('You are not the author of this comment');
    }

    await this.commentRepository.remove(comment);
  }
}
