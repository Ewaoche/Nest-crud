import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessLevel } from 'src/core/enums';
import { ROLES_KEY } from './roles.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<AccessLevel[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization?.split(' ')[1];
    
    if (!token) {
      return false;
    }

    for (const role of requiredRoles) {
      const { isValid } = await this.userService.validate(token, role);
      if (isValid) {
        return true;
      }
    }

    return false;
  }
}