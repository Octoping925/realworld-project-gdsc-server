import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/user/schema';
import { JWT_CONSTANT } from './auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async validateToken(token: string) {
    const payload = this.jwtService.sign({ sub: 1, email: token });

    return {
      accessToken: payload,
    };
  }

  public createToken(userId: number, email: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email },
      {
        expiresIn: JWT_CONSTANT.ACCESS_TOKEN_EXPIRE,
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, email },
      {
        expiresIn: JWT_CONSTANT.REFRESH_TOKEN_EXPIRE,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
