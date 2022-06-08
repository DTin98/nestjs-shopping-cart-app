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
import {ICartItem} from '../cartItem/interfaces/cartItem.interface';
import {IConfiguration} from '../configuration/interfaces/configuration.interface';
import * as nodeMailer from 'nodemailer';
import * as ejs from 'ejs';
import {newOrderSendMailStr} from './newOrderSendMail';
import {OAuth2Client} from 'google-auth-library';

const GOOGLE_MAILER_CLIENT_ID = '169014924536-lipa8b1ffp4k3i818a9s595fp7qdn864.apps.googleusercontent.com';
const GOOGLE_MAILER_CLIENT_SECRET = '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';
const GOOGLE_MAILER_REFRESH_TOKEN = '1//044Q92yj3xNrfCgYIARAAGAQSNwF-L9IruHBKZg-b_ASGb4kqhSihejVxwytgOQuycizu_e5UjsVbKNeaZQRs_UlJ-HIqCeeoG-c';
const ADMIN_EMAIL_ADDRESS = 'kaisin1505@gmail.com';

const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Order') private readonly orderModel: Model<IOrder>,
        @InjectModel('Cart') private readonly cartModel: Model<ICart>,
        @InjectModel('CartItem') private readonly cartItemModel: Model<ICartItem>,
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Product') private readonly productModel: Model<IOrderItem>,
        @InjectModel('Configuration') private readonly configModel: Model<IConfiguration>,
        @InjectModel('OrderItem') private readonly orderItemModel: Model<IOrderItem>,
        @InjectConnection() private readonly connection: mongoose.Connection,
    ) {
    }

    async orderCart(
        userId: string,
        createOrderCartDto: CreateOrderCartDto,
    ): Promise<IOrder> {
        const orderItemIds = [];
        let subTotal = 0;
        let total = 0;

        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const user: IUser = await this.userModel.findOne({_id: userId});
            const userCart: ICart = await this.cartModel
                .findOne({userId})
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
                    userId,
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

            const newOrder = await order.save({session});

            for (const cartItem of userCart.cartItems) {
                const orderItem = new this.orderItemModel({
                        orderId: order._id,
                        productId: cartItem.productId,
                        quantity: cartItem.quantity,
                        size: cartItem.size,
                        price: cartItem.product.priceBySize.find(p => p.size === cartItem.size).price,
                    },
                );
                await orderItem.save({session});
                // get price cartItem
                const price = cartItem.product.priceBySize.find(p => p.size === cartItem.size).price;
                subTotal += price * cartItem.quantity;
                orderItemIds.push(orderItem._id);
            }

            // update orderItems to order
            total = subTotal + newOrder.tax - newOrder.discount;
            await this.orderModel.updateOne(
                {_id: order._id},
                {cartId: userCart._id, orderItems: orderItemIds, subTotal, total},
                {session},
            );
            // remove cart
            await this.cartModel.deleteOne({_id: userCart._id}, {session});

            // remove cartitems
            await this.cartItemModel.deleteMany({}, {session});

            // decrease product quantity
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

            // Send mail to admin
            // create reusable transporter object using the default SMTP transport
            const myAccessObj = await myOAuth2Client.getAccessToken();
            const myAccessToken = myAccessObj?.token;
            console.log('myAccessObj', myAccessObj);
            const smtpConfig = {
                transport: {
                    service: 'Gmail',
                    secure: true,
                    auth: {
                        type: 'OAuth2',
                        user: ADMIN_EMAIL_ADDRESS,
                        clientId: GOOGLE_MAILER_CLIENT_ID,
                        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                        accessToken: myAccessToken,
                    },
                },
            };
            const transporter = nodeMailer.createTransport(smtpConfig);
            const config = await this.configModel.find({}).exec();
            // tslint:disable-next-line:variable-name
            const _newOrder = await this.orderModel
                .findOne({_id: newOrder._id})
                .populate('orderItems', null, null, {populate: {path: 'product'}});

            const compiledFunction = ejs.compile(newOrderSendMailStr);
            const mailOptions = {
                to: config[0].toJSON().contact.email,
                subject: 'New order',
                html: compiledFunction({newOrder: _newOrder}),
            };
            transporter.sendMail(mailOptions).then(() => {
                console.log('Email sent');
            }).catch(err => {
                console.log(err);
            })

            return _newOrder;
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
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
        return this.orderModel.find({userId}).populate('orderItems', null, null, {populate: {path: 'product'}});
    }

    async delete(id: string): Promise<{ ok?: number; n?: number }> {
        const category = await this.findOne(id);
        if (!category) {
            throw new BadRequestException('Product id is not found');
        }
        return await this.orderModel.deleteOne({_id: id});
    }
}
