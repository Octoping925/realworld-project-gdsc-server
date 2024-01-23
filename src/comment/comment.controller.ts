import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentListDto } from './dto/comment-list.dto';
import { CommentDto } from './dto/comment.dto';
import { DUMMY_COMMENT } from './schema/comment.dummy.schema';

@Controller('article/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public findCommentsOfArticle(@Param('slug') slug: string): CommentListDto {
    this.commentService.findAll();

    return {
      comments: [DUMMY_COMMENT, DUMMY_COMMENT, DUMMY_COMMENT],
      commentsCount: 3,
    };
  }

  @Post()
  public createComment(@Body() createCommentDto: CreateCommentDto): CommentDto {
    this.commentService.create(createCommentDto);

    return {
      comment: DUMMY_COMMENT,
    };
  }

  @Delete(':id')
  public removeComment(@Param('id') id: string): void {
    this.commentService.remove(+id);
  }
}
