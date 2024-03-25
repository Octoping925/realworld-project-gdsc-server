import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../config/jwt.config';
import { AuthService, AccessTokenStrategy, RefreshTokenStrategy } from '.';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
    JwtService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
