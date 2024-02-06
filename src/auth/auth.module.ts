import { Module } from '@nestjs/common';
import { RefreshTokenStrategy } from './refresh-token.strategy';
import { AccessTokenStrategy } from './access-token.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
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
})
export class AuthModule {}
