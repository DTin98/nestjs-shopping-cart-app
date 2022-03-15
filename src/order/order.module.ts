import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './schemas/order.schema';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PassportModule } from '@nestjs/passport';
import { cartSchema } from 'src/cart/schemas/cart.schema';
import { orderItemSchema } from 'src/orderItem/schemas/orderItem.schema';
import { CartService } from 'src/cart/cart.service';
import { CartItemService } from 'src/cartItem/cartItem.service';
import { cartItemSchema } from 'src/cartItem/schemas/cartItem.schema';
import { userSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }]),
    MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }]),
    MongooseModule.forFeature([{ name: 'CartItem', schema: cartItemSchema }]),
    MongooseModule.forFeature([{ name: 'OrderItem', schema: orderItemSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [OrderService, CartService, CartItemService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule { }
