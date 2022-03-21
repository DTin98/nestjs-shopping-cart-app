import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { OrderService } from './order.service';
import { CreateOrderCartDto } from './dto/create-order-cart.dto';
import { IOrder } from './interfaces/order.interface';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { CartService } from 'src/cart/cart.service';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ROLE } from 'src/user/enums/role.enum';

@Controller('orders')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) { }

  @Get('/')
  @Public()
  async getAll(): Promise<IOrder[]> {
    return this.orderService.find();
  }

  @Get('/:id')
  @Public()
  async getOne(@Param('id') id: string): Promise<IOrder> {
    return this.orderService.findOne(id);
  }

  @Post('/cart')
  async orderCart(
    @User() user: IUser,
    @Body(new ValidationPipe()) createOrderCartDto: CreateOrderCartDto,
  ): Promise<IOrder> {
    try {
      return this.orderService.orderCart(user._id, createOrderCartDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch('/')
  @Roles(ROLE.admin)
  async update(
    @User() user: IUser,
    @Body(new ValidationPipe()) createOrderCartDto: CreateOrderCartDto,
  ): Promise<IOrder> {
    try {
      return this.orderService.orderCart(user._id, createOrderCartDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete('/:id')
  @Public()
  async delete(@Param('id') id: string): Promise<{ ok?: number; n?: number }> {
    return this.orderService.delete(id);
  }
}
