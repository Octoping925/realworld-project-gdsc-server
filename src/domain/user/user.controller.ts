import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  UserService,
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserDto,
} from '.';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  AuthService,
  JWT_CONSTANT,
  JwtPayload,
  RequestUserId,
} from '../../auth';
import { NeedLogin } from '../../common/NeedLogin';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '유저 생성' })
  @Post()
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return { user };
  }

  @ApiOperation({ summary: '유저 로그인' })
  @Post('login')
  public async login(
    @Body() request: LoginUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.userService.findByEmailAndPassword(
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
  public async getCurrentUser(
    @RequestUserId() userId: number,
  ): Promise<UserDto> {
    const user = await this.userService.findOne(userId);
    return { user };
  }

  @ApiOperation({ summary: '유저 정보 수정' })
  @NeedLogin()
  @Put(':id')
  public async updateUser(
    @RequestUserId() userId: number,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    if (userId !== id) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.update(id, updateUserDto);
    return { user };
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { refreshToken, sub } = req.user as JwtPayload & {
      refreshToken: string;
    };

    if (!this.authService.validateToken(refreshToken)) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    const user = await this.userService.findOne(sub);

    const { accessToken, refreshToken: newRefreshToken } =
      this.authService.createToken(user.id, user.username);

    res
      .status(200)
      .cookie(JWT_CONSTANT.ACCESS_TOKEN_NAME, accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + JWT_CONSTANT.ACCESS_TOKEN_EXPIRE),
      })
      .cookie(JWT_CONSTANT.REFRESH_TOKEN_NAME, newRefreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + JWT_CONSTANT.REFRESH_TOKEN_EXPIRE),
      })
      .json({ user });
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
