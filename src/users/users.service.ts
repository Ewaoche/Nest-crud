/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}

    async findAll(){
        return this.prisma.prismaClient.user.findMany();

    }

    async findByUsername(username: string) {
        try {
          const user = await this.prisma.prismaClient.user.findFirst({
            where: { username },
          });
      
          if (!user) {
            // Handle case where user does not exist
            throw new Error(`User with username "${username}" not found.`);
          }
      
          return user;
        } catch (error) {
          // Log the error for debugging purposes
          console.error(`Failed to find user by username: ${username}`, error);
          throw new Error('An error occurred while fetching the user.');
        }
      }
      

    async create(data:Prisma.UserCreateInput){
        console.log(data)
        return this.prisma.prismaClient.user.create({data})
    }
}
