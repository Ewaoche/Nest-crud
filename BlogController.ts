import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
  } from "@nestjs/common";
  import { BlogService } from "./blog.service";
  import { CreateBlogDto } from "./dto/create-blog.dto";
  import { UpdateBlogDto } from "./dto/update-blog.dto";
  import { Roles } from "../decorators/roles.decorator";
  import { RolesGuard } from "../guards/roles.guard";
  import { User } from "../decorators/user.decorator";
  import { AccessLevel } from "src/core/enums";
  
  @Controller("api/v:version/blog")
  @UseGuards(RolesGuard)
  export class BlogController {
    constructor(private readonly blogService: BlogService) {}
  
    @Post()
    @Roles(AccessLevel.ADMINISTRATOR)
    async create(@Body() createBlogDto: CreateBlogDto, @User() user) {
      return this.blogService.create(user, createBlogDto);
    }
  
    @Get()
    @Roles(AccessLevel.ADMINISTRATOR, AccessLevel.SUPER_ADMINISTRATOR)
    findAll() {
      return this.blogService.findAll();
    }
  
    @Get(":id")
    @Roles(AccessLevel.ADMINISTRATOR, AccessLevel.SUPER_ADMINISTRATOR, AccessLevel.USER)
    findOne(@Param("id") id: string) {
      return this.blogService.findOne(+id);
    }
  
    @Patch(":id")
    @Roles(AccessLevel.ADMINISTRATOR, AccessLevel.SUPER_ADMINISTRATOR)
    update(@Param("id") id: string, @Body() updateBlogDto: UpdateBlogDto, @User() user) {
      return this.blogService.update(+id, updateBlogDto, user);
    }
  
    @Delete(":id")
    @Roles(AccessLevel.ADMINISTRATOR, AccessLevel.SUPER_ADMINISTRATOR)
    remove(@Param("id") id: string, @User() user) {
      return this.blogService.remove(+id, user);
    }
  }