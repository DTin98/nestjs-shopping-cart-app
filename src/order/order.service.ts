import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CART_STATUS} from 'src/cart/enums/cart-status.enum';
import {ICart} from 'src/cart/interfaces/cart.interface';
import {IOrderItem} from 'src/orderItem/interfaces/orderItem.interface';
import {IUser} from 'src/user/interfaces/user.interface';
import {
    SHIPPING_DEFAULT,
    SUB_TOTAL_DEFAULT,
    TAX_DEFAULT,
    TOTAL_DEFAULT,
} from './constant';
import {CreateOrderCartDto} from './dto/create-order-cart.dto';
import {IOrder} from './interfaces/order.interface';
import {InjectConnection} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {UpdateOrderCartDto} from './dto/update-order.dto';
import {ICartItem} from "../cartItem/interfaces/cartItem.interface";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<IOrder>,
        @InjectModel('Cart') private readonly cartModel: Model<ICart>,
        @InjectModel('CartItem') private readonly cartItemModel: Model<ICartItem>,
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Product') private readonly productModel: Model<IOrderItem>,
        @InjectModel('OrderItem')
        private readonly orderItemModel: Model<IOrderItem>,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) {
    }

    async orderCart(
        userId: string,
        createOrderCartDto: CreateOrderCartDto,
    ): Promise<IOrder> {
        let orderItemIds = [];
        let subTotal = 0;
        let total = 0;

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const user: IUser = await this.userModel.findOne({_id: userId});
            const userCart: ICart = await this.cartModel
                .findOne({userId: userId})
                .populate('cartItems', null, null, {populate: {path: 'product'}});

            if (!userCart) {
                throw new BadRequestException('Cart is empty');
            }

            // update user cart to CHECK_OUT
            await this.cartModel.updateOne(
                {_id: userCart._id},
                {status: CART_STATUS.CHECK_OUT},
                {session},
            );

            // create order
            const order = new this.orderModel(
                {
                    userId: userId,
                    tax: TAX_DEFAULT,
                    subTotal: SUB_TOTAL_DEFAULT,
                    total: TOTAL_DEFAULT,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: createOrderCartDto.phone || user.phone,
                    email: createOrderCartDto.email || user.email,
                    shipping: SHIPPING_DEFAULT,
                    address: createOrderCartDto.address || user.address,
                },
            );

            const newOrder = await order.save({session})

            for (const cartItem of userCart.cartItems) {
                const orderItem = new this.orderItemModel({
                        orderId: order._id,
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        size: cartItem.size,
                    },
                );
                await orderItem.save({session});
                subTotal += cartItem.product.productBySize[cartItem.size] * cartItem.quantity;
                orderItemIds.push(orderItem._id);
            }

            // update orderItems to order
            total = subTotal + newOrder.tax - newOrder.discount;
            await this.orderModel.updateOne(
                {_id: order._id},
                {cartId: userCart._id, orderItems: orderItemIds, subTotal: subTotal, total: total},
                {session},
            );
            //remove cart
            await this.cartModel.deleteOne({_id: userCart._id}, {session});

            //remove cartitems
            await this.cartItemModel.deleteMany({}, {session});

            //decrease product quantity
            for (const id of orderItemIds) {
                const orderItemProduct = await this.orderItemModel.findOne({_id: id.toString()}).populate('product').session(session);
                // console.log(orderItemProduct);
                await this.productModel.updateOne(
                    {_id: orderItemProduct.product._id},
                    {quantity: orderItemProduct.product.quantity - orderItemProduct.quantity},
                    {session},
                );
            }
            await session.commitTransaction();
            return await this.orderModel
                .findOne({_id: newOrder._id})
                .populate('orderItems', null, null, {populate: {path: 'product'}});
        } catch (error) {
            console.error(error)
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async find(): Promise<IOrder[]> {
        return this.orderModel
            .find()
            .sort({updateAt: 1})
            .populate('orderItems', null, null, {populate: {path: 'product'}});
    }

    async findOne(id: string): Promise<IOrder> {
        return this.orderModel.findOne({_id: id}).populate('orderItems', null, null, {populate: {path: 'product'}});
    }

    async update(id: string, updateOrderCartDto: UpdateOrderCartDto): Promise<IOrder> {
        const order = await this.orderModel.findOne({_id: id});
        await this.orderModel
            .updateOne({_id: id}, updateOrderCartDto);

        return await this.findOne(id);
    }

    async findByUser(userId: string): Promise<IOrder[]> {
        return this.orderModel.find({userId: userId}).populate('orderItems', null, null, {populate: {path: 'product'}});
    }

    async delete(id: string): Promise<{ ok?: number; n?: number }> {
        const category = await this.findOne(id);
        if (!category) throw new BadRequestException('Product id is not found');
        return await this.orderModel.deleteOne({_id: id});
    }
}
