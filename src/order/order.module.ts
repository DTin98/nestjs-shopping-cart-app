import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {orderSchema} from './schemas/order.schema';

import {OrderService} from './order.service';
import {OrderController} from './order.controller';
import {PassportModule} from '@nestjs/passport';
import {cartSchema} from 'src/cart/schemas/cart.schema';
import {orderItemSchema} from 'src/orderItem/schemas/orderItem.schema';
import {CartService} from 'src/cart/cart.service';
import {CartItemService} from 'src/cartItem/cartItem.service';
import {cartItemSchema} from 'src/cartItem/schemas/cartItem.schema';
import {userSchema} from 'src/user/schemas/user.schema';
import {productSchema} from '../product/schemas/product.schema';
import {ProductModule} from 'src/product/product.module';
import {MailerModule} from '@nestjs-modules/mailer';

@Module({
    imports: [
        ProductModule,
        MongooseModule.forFeature([{name: 'User', schema: userSchema}]),
        MongooseModule.forFeature([{name: 'Order', schema: orderSchema}]),
        MongooseModule.forFeature([{name: 'Cart', schema: cartSchema}]),
        MongooseModule.forFeature([{name: 'Product', schema: productSchema}]),
        MongooseModule.forFeature([{name: 'CartItem', schema: cartItemSchema}]),
        MongooseModule.forFeature([{name: 'OrderItem', schema: orderItemSchema}]),
        MongooseModule.forFeature([{name: 'Configuration', schema: orderItemSchema}]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        MailerModule.forRoot({
            transport: {
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: 'kaisin1505@gmail.com',
                    pass: 'Truongdaitin98@gmail',
                },
            },
        }),
    ],
    providers: [OrderService, CartService, CartItemService],
    controllers: [OrderController],
    exports: [OrderService],
})
export class OrderModule {
}
