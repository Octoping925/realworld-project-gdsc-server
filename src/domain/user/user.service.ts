import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema';
import { User as UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = UserEntity.of(createUserDto);
    await this.userRepository.save(user);

    return User.fromEntity(user);
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return User.fromEntity(user);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const isExistUser = await this.userRepository.exists({ where: { id } });

    if (!isExistUser) {
      throw new Error('User not found');
    }

    await this.userRepository.update(id, {
      email: updateUserDto.user.email,
      username: updateUserDto.user.username,
      bio: updateUserDto.user.bio,
      image: updateUserDto.user.image,
    });

    const updatedUser = await this.userRepository.findOneBy({ id });
    return User.fromEntity(updatedUser);
  }

  public async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ email, password });

    if (!user) {
      throw new Error('User not found');
    }

    return User.fromEntity(user);
  }
}
