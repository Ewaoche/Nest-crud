import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

export const User = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const userService = request.app.get(UserService);
    const { user } = await userService.validateToken(token);
    return user;
  },
);