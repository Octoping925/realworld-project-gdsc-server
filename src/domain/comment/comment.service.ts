import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment as CommentEntity } from './entities/comment.entity';
import { ArticleService } from '../article/article.service';
import { Comment } from './schema/comment.schema';
import { UserService } from '../user/user.service';
import { Profile } from '../user/schema';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
    private readonly followService: FollowService,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  public async findByArticleSlug(
    requestUserId: number | null,
    slug: string,
  ): Promise<Comment[]> {
    const article = await this.articleService.findOneBySlug(
      requestUserId,
      slug,
    );

    const comments = await this.commentRepository.findBy({
      articleId: article.id,
    });

    const authors = await Promise.all(
      comments.map(async (c) => {
        const author = await this.userService.findOne(c.userId);
        const isFollowing = await this.followService.isFollowing(
          requestUserId,
          author.id,
        );
        return Profile.fromUserSchema(author, isFollowing);
      }),
    );

    return comments.map((comment, idx) =>
      Comment.fromEntity(comment, authors[idx]),
    );
  }
}
