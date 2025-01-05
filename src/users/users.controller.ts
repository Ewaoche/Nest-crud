/* eslint-disable prettier/prettier */
import { Controller, Get,Body, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly userService:UsersService){ }

    @Get()
   async findAll(){
        return await this.userService.findAll();
    }

    @Post()
    @Roles('admin', 'manager') // Only users with 'admin' or 'manager' roles can access
        async  create(@Body() body:User){
            return await this.userService.create(body)
        }
    
}
