import { forwardRef, Module } from '@nestjs/common';
import { FollowController, FollowService, Follow } from '.';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Follow])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
