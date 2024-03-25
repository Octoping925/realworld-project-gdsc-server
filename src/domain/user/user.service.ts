import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schema';
import { User as UserEntity, CreateUserDto, UpdateUserDto } from '.';
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
      throw new NotFoundException('User not found');
    }

    return User.fromEntity(user);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const isExistUser = await this.userRepository.exists({ where: { id } });

    if (!isExistUser) {
      throw new NotFoundException('User not found');
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
      throw new NotFoundException('User not found');
    }

    return User.fromEntity(user);
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return User.fromEntity(user);
  }
}
