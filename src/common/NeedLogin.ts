import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const NeedLogin = () =>
  applyDecorators(UseGuards(AuthGuard('jwt-access')));
