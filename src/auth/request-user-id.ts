import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common/decorators';

export type RequestUser = {
  userId: number;
  username: string;
};

export const RequestUserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as RequestUser;
  },
);
