import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { DUMMY_USER } from './schema/user.dummy.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): UserDto {
    this.userService.create(createUserDto);

    return {
      user: DUMMY_USER,
    };
  }

  @Post('/login')
  public login(@Body() request: LoginUserDto): UserDto {
    // this.userService.create(request);

    return {
      user: DUMMY_USER,
    };
  }

  @Get()
  public getCurrentUser(): UserDto {
    return {
      user: DUMMY_USER,
    };
  }

  @Put(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }
}
