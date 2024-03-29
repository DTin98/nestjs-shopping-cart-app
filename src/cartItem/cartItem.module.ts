import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { cartItemSchema } from './schemas/cartItem.schema';

import { CartItemService } from './cartItem.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CartItem', schema: cartItemSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
