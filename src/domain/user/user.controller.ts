import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto, UserDto } from './dto';
import { DUMMY_USER } from './schema/user.dummy.schema';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../../auth/jwt-payload';
import { AuthService } from '../../auth/auth.service';
import { JWT_CONSTANT } from '../../auth/auth.constant';
import { NeedLogin } from '../../common/NeedLogin';
import { RequestUser, RequestUserData } from '../../auth/request-user-id';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '유저 생성' })
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): UserDto {
    this.userService.create(createUserDto);

    return {
      user: DUMMY_USER,
    };
  }

  @ApiOperation({ summary: '유저 로그인' })
  @Post('login')
  public login(@Body() request: LoginUserDto, @Res() res: Response) {
    const user = this.userService.findByEmailAndPassword(
      request.user.email,
      request.user.password,
    );

    const { accessToken, refreshToken } = this.authService.createToken(
      user.id,
      user.username,
    );

    res
      .status(200)
      .cookie(JWT_CONSTANT.ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + JWT_CONSTANT.ACCESS_TOKEN_EXPIRE),
      })
      .cookie(JWT_CONSTANT.REFRESH_TOKEN_NAME, refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + JWT_CONSTANT.REFRESH_TOKEN_EXPIRE),
      })
      .json({ user });
  }

  @ApiOperation({ summary: '로그인된 유저 조회' })
  @NeedLogin()
  @Get()
  public getCurrentUser(@RequestUserData() user: RequestUser): UserDto {
    console.log(user);

    return {
      user: DUMMY_USER,
    };
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @NeedLogin()
  @Put(':id')
  public updateUser(
    // @RequestUserId() userId: number | null,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    // const { refreshToken, sub } = req.user as JwtPayload & {
    //   refreshToken: string;
    // };
    // const user = await this.userService.findByIdAndCheckRT(sub, refreshToken);
    //
    // const token = this.authService.getToken({ sub, email });
    //
    // res
    //   .cookie('access-token', token.accessToken)
    //   .cookie('refresh-token', token.refreshToken);
    //
    // await this.userService.updateHashedRefreshToken(user.id, refreshToken);
    //
    // res.redirect('/');
  }

  @ApiOperation({ summary: '로그아웃' })
  @NeedLogin()
  @Post('logout')
  public logout(@Req() req: Request, @Res() res: Response) {
    res
      .status(200)
      .json()
      .cookie(JWT_CONSTANT.ACCESS_TOKEN_NAME, '', { expires: new Date() })
      .cookie(JWT_CONSTANT.REFRESH_TOKEN_NAME, '', { expires: new Date() });
  }
}
