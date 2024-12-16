/* eslint-disable prettier/prettier */
import { Controller, Get,Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){ }

    @Get()
   async findAll(){
        return await this.userService.findAll();
    }

    @Post()
    async  create(@Body() body:any){
            return await this.userService.create(body)
        }
    
}
