import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentListDto } from './dto/comment-list.dto';
import { CommentDto } from './dto/comment.dto';
import { DUMMY_COMMENT } from './schema/comment.dummy.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NeedLogin } from '../../common/NeedLogin';
import { RequestUserId } from '../../auth/request-user-id';

@ApiTags('Comments')
@Controller('article/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '게시물 댓글 불러오기' })
  @Get()
  public async findCommentsOfArticle(
    @RequestUserId() requestUserId: number | null,
    @Param('slug') slug: string,
  ): Promise<CommentListDto> {
    const comments = await this.commentService.findByArticleSlug(
      requestUserId,
      slug,
    );

    return {
      comments,
      commentsCount: comments.length,
    };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 댓글 생성' })
  @Post()
  public async createComment(
    @RequestUserId() requestUserId: number,
    @Param('slug') slug: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentDto> {
    this.commentService.create(createCommentDto);

    return {
      comment: DUMMY_COMMENT,
    };
  }

  @NeedLogin()
  @ApiOperation({ summary: '게시물 댓글 삭제' })
  @Delete(':id')
  public async removeComment(
    @RequestUserId() requestUserId: number,
    @Param('slug') slug: string,
    @Param('id') id: string,
  ): Promise<void> {
    this.commentService.remove(+id);
  }
}
