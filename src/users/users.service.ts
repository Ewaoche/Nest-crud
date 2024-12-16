/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(){
        return this.prisma.prismaClient.user.findMany();

    }

    async create(data:any){
        console.log(data)
        return this.prisma.prismaClient.user.create({data})
    }
}
