import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PassportModule,
    // PassportModule.register({defaultStrategy: "jwt"}),
  ],
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class PassportConfigModule {}
