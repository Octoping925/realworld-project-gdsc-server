import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common/decorators';

export const RequestUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user.userId,
);
