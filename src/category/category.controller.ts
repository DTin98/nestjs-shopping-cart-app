import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-product.dto';
import { ICategory } from './interfaces/category.interface';

@Controller('categories')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @Public()
  async getAll(): Promise<ICategory[]> {
    return this.categoryService.find();
  }

  @Get('/:id')
  @Public()
  async getOne(@Param('id') id: string): Promise<ICategory> {
    return this.categoryService.findOne(id);
  }

  @Post('/')
  @Public()
  async create(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete('/:id')
  @Public()
  async delete(@Param('id') id: string): Promise<{ ok?: number; n?: number }> {
    return this.categoryService.delete(id);
  }
}
