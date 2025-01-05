/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersService.findByUsername(decoded.username)
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;
      return true;
    } catch (error:any) {
      throw new UnauthorizedException('Invalid or expired token',error);
    }
  }
}
