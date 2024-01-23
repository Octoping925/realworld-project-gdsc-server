import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentListDto } from './dto/comment-list.dto';
import { CommentDto } from './dto/comment.dto';
import { DUMMY_COMMENT } from './schema/comment.dummy.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('article/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '게시물 댓글 불러오기' })
  @Get()
  public findCommentsOfArticle(@Param('slug') slug: string): CommentListDto {
    this.commentService.findAll();

    return {
      comments: [DUMMY_COMMENT, DUMMY_COMMENT, DUMMY_COMMENT],
      commentsCount: 3,
    };
  }

  @ApiOperation({ summary: '게시물 댓글 생성' })
  @Post()
  public createComment(
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentDto,
  ): CommentDto {
    this.commentService.create(createCommentDto);

    return {
      comment: DUMMY_COMMENT,
    };
  }

  @ApiOperation({ summary: '게시물 댓글 삭제' })
  @Delete(':id')
  public removeComment(
    @Param('slug') slug: string,
    @Param('id') id: string,
  ): void {
    this.commentService.remove(+id);
  }
}
