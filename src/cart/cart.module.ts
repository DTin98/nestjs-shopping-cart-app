import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from './schemas/cart.schema';

import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PassportModule } from '@nestjs/passport';
import { CartItemModule } from 'src/cartItem/cartItem.module';

@Module({
  imports: [
    CartItemModule,
    MongooseModule.forFeature([{ name: 'Cart', schema: cartSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule { }
