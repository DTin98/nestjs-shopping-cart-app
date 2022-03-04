import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './schemas/order.schema';

import { CartService } from './order.service';
import { CartController } from './order.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: orderSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule { }
