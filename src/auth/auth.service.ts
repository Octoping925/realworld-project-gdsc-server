import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // constructor(
  //   private readonly userReader: UserReader,
  //   private readonly userCreator: UserCreator,
  // ) {}
  //
  // public async register(user: NewUser): Promise<User> {
  //   const hashedPassword = '1234';
  //
  //   try {
  //     const createdUser = await this.userCreator.create(
  //       user.username,
  //       user.email,
  //       hashedPassword,
  //     );
  //
  //     return {
  //       email: createdUser.email,
  //       token: '',
  //       username: createdUser.username,
  //       bio: createdUser.bio,
  //       image: createdUser.image,
  //     };
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // }
  //
  // public async login(user: User) {
  //   const payload = { username: 'john', sub: 1 };
  //
  //   // return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60s' });
  // }
  //
  // public async getAuthenticatedUser(email: string, hashedPassword: string) {
  //   try {
  //     const user = await this.userReader.getByEmail(email);
  //     const isPasswordMatching = await bcrypt.compare(
  //       hashedPassword,
  //       user.password,
  //     );
  //
  //     if (!isPasswordMatching) {
  //       throw new HttpException(
  //         '잘못된 인증 정보입니다.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     user.password = undefined;
  //
  //     return user;
  //   } catch (error) {
  //     throw new HttpException(
  //       '잘못된 인증 정보입니다.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
  //
  // public verify(jwtString: string) {
  //   try {
  //     // return jwt.verify(jwtString, process.env.JWT_SECRET) as jwt.JwtPayload &
  //     //   User;
  //   } catch (e) {
  //     throw new UnauthorizedException(e.message);
  //   }
  // }
}
