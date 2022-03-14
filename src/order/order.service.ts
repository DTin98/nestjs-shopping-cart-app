import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICart } from 'src/cart/interfaces/cart.interface';
import { CreateCartDto } from './dto/create-cart.dto';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<IOrder>,
        @InjectModel('Cart') private readonly cartModel: Model<ICart>) { }

    async orderCart(userId: string): Promise<IOrder> {
        const userCart: ICart = await this.cartModel.findOne({ userId: userId });
        let orderItemIds = [];
        for (const cartItem of userCart.cartItems) {
            const orderItem = await this.orderModel.create({
                productId: cartItem.productId,
                price: cartItem.product
            })
        }

        return;
    }

    async find(): Promise<IOrder[]> {
        return this.orderModel.find();
    }

    async findOne(id: string): Promise<IOrder> {
        return this.orderModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<{ ok?: number, n?: number }> {
        const category = await this.findOne(id);
        if (!category)
            throw new BadRequestException('Product id is not found');
        return await this.orderModel.deleteOne({ _id: id });
    }

}
