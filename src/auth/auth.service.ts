/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtservice:JwtService){}
    

    async authenticate(username:string){
      const userdata = await this.validateUser(username)
      if(!userdata) {
        throw new UnauthorizedException()
      }

      const acctok = await this.jwtservice.signAsync(userdata)

      return{
        accessToken:acctok,
        user:userdata
      }

    }

    async validateUser( username:string){
      const user = await this.usersService.findByUsername(username);
      if(user)  return user

    // If validation fails, throw an exception
    throw new UnauthorizedException('Invalid credentials');
    }
}
