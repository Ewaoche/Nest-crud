/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: User) {
      return await this.authService.authenticate(body.username);
    }
}
