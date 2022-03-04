import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { orderItemSchema } from './schemas/orderItem.schema';

import { OrderItemService } from './orderItem.service';
import { OrderItemController } from './orderItem.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'OrderItem', schema: orderItemSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [OrderItemService],
  controllers: [OrderItemController],
  exports: [OrderItemService],
})
export class OrderItemModule { }
