import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';
import { PassportConfigModule } from './config/passport/passport.module';

@Module({
  imports: [DomainModule, AuthModule, PassportConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
