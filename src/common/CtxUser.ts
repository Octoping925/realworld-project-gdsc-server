import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CtxUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ContextUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

export class ContextUser {
  email: string;
}
