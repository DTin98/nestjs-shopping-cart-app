import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IPost } from './interfaces/post.interface';
import { ROLE } from 'src/user/enums/role.enum';
import { Roles } from 'src/shared/decorators/role.decorator';

@Controller('post')
@ApiTags('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  async findAll(): Promise<IPost[]> {
    return await this.postService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async findOne(@Param('id') id: string): Promise<IPost> {
    return await this.postService.findOne(id);
  }

  @Get('/slug/:slug')
  @HttpCode(HttpStatus.OK)
  @Public()
  async findOneBySlug(@Param('slug') slug: string): Promise<IPost> {
    return await this.postService.findOneBySlug(slug);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(ROLE.admin)
  async create(
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
  ): Promise<IPost> {
    return await this.postService.create(createPostDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(ROLE.admin)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePostDto: UpdatePostDto,
  ): Promise<IPost> {
    return await this.postService.findOneAndUpdate(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async delete(@Param('id') id: string): Promise<IPost> {
    return await this.postService.findOneAndDelete(id);
  }
}
