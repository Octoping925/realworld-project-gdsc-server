import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, AuthService, ProfileService],
  exports: [UserService, ProfileService],
})
export class UserModule {}
