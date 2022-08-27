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
import { UpdateOrderCartDto } from './dto/update-order.dto';

@Controller('orders')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartService,
  ) { }

  @Get('/')
  @Roles(ROLE.admin)
  async getAll(): Promise<IOrder[]> {
    return this.orderService.find();
  }

  @Get('/me')
  async getMyOrders(@User() user: IUser): Promise<IOrder[]> {
    return this.orderService.findByUser(user._id);
  }

  @Get('/:id')
  @Roles(ROLE.admin)
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

  @Patch('/:id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updateOrderCartDto: UpdateOrderCartDto,): Promise<IOrder> {
    try {
      return this.orderService.update(id, updateOrderCartDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
