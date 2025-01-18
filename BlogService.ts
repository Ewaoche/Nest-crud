/* eslint-disable prettier/prettier */
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from "@nestjs/common";
  import { Repository } from "typeorm";
  import { Blog } from "./entities/blog.entity";
  import { InjectRepository } from "@nestjs/typeorm";
  import { User } from "src/user/entities/user.entity";
  import { CreateBlogDto } from "./dto/create-blog.dto";
  import { UpdateBlogDto } from "./dto/update-blog.dto";
  import { ActivityService } from "src/activity/activity.service";
  
  @Injectable()
  export class BlogService {
    constructor(
      @InjectRepository(Blog) private blogRepository: Repository<Blog>,
      private activityService: ActivityService,
    ) {}
  
    async create(user: User, createBlogDto: CreateBlogDto) {
      try {
        const blog = new Blog({});
  
        Object.assign(blog, createBlogDto, {
          keywords: createBlogDto.keywords.split(","),
          createdBy: user.id,
        });
  
        await this.blogRepository.save(blog);
        await this.activityService.create({
          log: "Created a New Blog",
          createdBy: user.id,
        });
  
        return {
          status: true,
          message: "Blog has been created successfully",
        };
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          "Something went wrong while creating blog",
        );
      }
    }
  
    async findAll() {
      try {
        const blogs = await this.blogRepository.find();
        return {
          message: "Blogs retrieved successfully",
          blogs,
        };
      } catch (error) {
        throw new InternalServerErrorException("Failed to retrieve blogs");
      }
    }
  
    async findOne(id: number) {
      try {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) throw new NotFoundException("Blog not found");
        return blog;
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException("Failed to retrieve blog");
      }
    }
  
    async update(id: number, updateBlogDto: UpdateBlogDto, user: User) {
      try {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) throw new NotFoundException("Blog not Found");
  
        await this.blogRepository.update(id, {
          ...updateBlogDto,
          keywords: updateBlogDto.keywords.split(","),
        });
  
        await this.activityService.create({
          log: `Updated Blog #${id}`,
          createdBy: user.id,
        });
  
        return { message: `Blog #${id} updated successfully` };
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException("Failed to update blog");
      }
    }
  
    async remove(id: number, user: User) {
      try {
        const blog = await this.blogRepository.findOne({ where: { id } });
        if (!blog) throw new NotFoundException("Blog not Found");
  
        await this.blogRepository.remove(blog);
        await this.activityService.create({
          log: `Deleted Blog #${id}`,
          createdBy: user.id,
        });
  
        return { message: `Blog #${id} deleted successfully` };
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException("Failed to delete blog");
      }
    }
  }