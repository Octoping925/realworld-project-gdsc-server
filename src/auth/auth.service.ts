import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../domain/user/schema';
import { JWT_CONSTANT } from './auth.constant';
import { JWT_SECRET } from '../config/jwt.config';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public validateToken(token: string): boolean {
    try {
      jwt.verify(token, JWT_SECRET);
      return true;
    } catch (e) {
      return false;
    }
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
