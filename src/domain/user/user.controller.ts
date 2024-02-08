import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { DUMMY_USER } from './schema/user.dummy.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ContextUser, CtxUser } from '../../common/CtxUser';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 생성' })
  @Post()
  public createUser(@Body() request: CreateUserDto): UserDto {
    this.userService.createUser(request.user);

    return {
      user: DUMMY_USER,
    };
  }

  @ApiOperation({ summary: '유저 로그인' })
  @Post('/login')
  public async login(@Body() request: LoginUserDto, @Res() response: Response) {
    await this.userService.login(request.user.email, request.user.password);

    response
      .status(200)
      .send({ user: DUMMY_USER })
      .cookie('accessToken', '1234')
      .cookie('refreshToken', '1234');
  }

  @ApiOperation({ summary: '로그인된 유저 조회' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  public getCurrentUser(@CtxUser() user: ContextUser): UserDto {
    return {
      user: DUMMY_USER,
    };
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  public updateUser(
    @CtxUser() user: ContextUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // return this.userService.update(+id, updateUserDto);
  }
}

type RequestWithUser = {};
