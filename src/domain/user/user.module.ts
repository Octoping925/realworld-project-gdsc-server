import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { ProfileService } from './profile.service';
import { FollowModule } from '../follow/follow.module';

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
