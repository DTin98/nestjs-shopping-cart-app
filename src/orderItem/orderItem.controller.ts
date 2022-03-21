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
import { OrderItemService } from './orderItem.service';
import { CreateCategoryDto } from './dto/create-product.dto';
import { IOrderItem } from './interfaces/orderItem.interface';

@Controller('categories')
@ApiTags('category')
export class OrderItemController {
  constructor(private readonly categoryService: OrderItemService) {}

  @Get('/')
  @Public()
  async getAll(): Promise<IOrderItem[]> {
    return this.categoryService.find();
  }

  @Get('/:id')
  @Public()
  async getOne(@Param('id') id: string): Promise<IOrderItem> {
    return this.categoryService.findOne(id);
  }

  @Post('/')
  @Public()
  async create(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ): Promise<IOrderItem> {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete('/:id')
  @Public()
  async delete(@Param('id') id: string): Promise<{ ok?: number; n?: number }> {
    return this.categoryService.delete(id);
  }
}
