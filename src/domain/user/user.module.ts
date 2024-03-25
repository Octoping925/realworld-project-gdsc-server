import { forwardRef, Module } from '@nestjs/common';
import {
  UserService,
  UserController,
  User as UserEntity,
  ProfileService,
} from '.';
import { AuthModule } from '../../auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowModule } from '../follow';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => FollowModule),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, ProfileService],
  exports: [UserService, ProfileService],
})
export class UserModule {}
