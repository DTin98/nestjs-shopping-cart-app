import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICart } from 'src/cart/interfaces/cart.interface';
import { IOrderItem } from 'src/orderItem/interfaces/orderItem.interface';
import { IUser } from 'src/user/interfaces/user.interface';
import { SHIPPING_DEFAULT, SUB_TOTAL_DEFAULT, TAX_DEFAULT, TOTAL_DEFAULT } from './constant';
import { CreateOrderCartDto } from './dto/create-order-cart.dto';
import { IOrder } from './interfaces/order.interface';

@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private readonly orderModel: Model<IOrder>,
        @InjectModel('Cart') private readonly cartModel: Model<ICart>,
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('OrderItem') private readonly orderItemModel: Model<IOrderItem>,
    ) { }

    async orderCart(userId: string, createOrderCartDto: CreateOrderCartDto): Promise<IOrder> {
        let orderItemIds = [];
        let subTotal = 0;
        let total = 0;

        const user: IUser = await this.userModel.findOne({ _id: userId });
        const userCart: ICart = await this.cartModel.findOne({ userId: userId })
            .populate('cartItems', null, null, { populate: { path: 'product' } });
        //TODO: Update user cart to PAID

        const order = await this.orderModel.create({
            tax: TAX_DEFAULT,
            subTotal: SUB_TOTAL_DEFAULT,
            total: TOTAL_DEFAULT,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            shipping: SHIPPING_DEFAULT,
            address: {
                city: createOrderCartDto.city,
                addressLine1: createOrderCartDto.addressLine1,
                addressLine2: createOrderCartDto.addressLine2,
            }
        });

        for (const cartItem of userCart.cartItems) {
            const orderItem = await this.orderItemModel.create({
                orderId: order._id,
                productId: cartItem.productId,
                price: cartItem.product.price,
                quantity: cartItem.product.quantity,
            });
            subTotal += cartItem.product.price * cartItem.product.quantity;
            orderItemIds.push(orderItem._id);
        }

        //update orderItems to order
        total = subTotal + order.tax - order.discount;
        await this.orderModel.updateOne({ _id: order._id }, { orderItems: orderItemIds, subTotal: subTotal, total: total });

        return await this.orderModel.findOne({ _id: order._id }).populate('orderItems', null, null, { populate: { path: 'product' } });
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
