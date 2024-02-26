import { forwardRef, Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([Follow])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
