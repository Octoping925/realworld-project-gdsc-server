import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../../auth/auth.service';
import { NewUser } from './schema/new-user.schema';

@Injectable()
export class UserService {
  constructor(private readonly authService: AuthService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async createUser(newUser: NewUser) {
    const { username, email, password } = newUser;
  }

  public async login(email: string, password: string) {
    // const user = await this.userRepository.findOne({
    //   where: { email, password },
    // });
    //
    // if (!user) {
    //   throw new Error('User not found');
    // }
    //
    // return this.authService.login({
    //   id: user.id,
    //   email: user.email,
    //   name: user.name,
    // });
  }
}
