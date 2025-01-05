/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: {  username: string }) {
      return await this.authService.authenticate(body.username);
    }
}
