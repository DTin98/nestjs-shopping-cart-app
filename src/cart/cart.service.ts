import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemService } from 'src/cartItem/cartItem.service';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ICart } from './interfaces/cart.interface';

@Injectable()
export class CartService {
    constructor(
        @InjectModel('Cart') private readonly cartModel: Model<ICart>,
        private readonly cartItemService: CartItemService,
    ) { }

    async getCart(userId: string): Promise<ICart> {
        return this.cartModel.findOne({ userId: userId }).populate('cartItems', null, null, { populate: { path: 'product' } });
    }

    async createCartUser(userId: string, productId: string, createCartDto: CreateCartDto): Promise<ICart> {
        const cart = await this.findOneByUser(userId);
        if (!!cart) {
            return await this.addProductToCart(cart._id, productId);
        }
        const newCart: ICart = new this.cartModel({ userId: userId, ...createCartDto });
        await newCart.save();
        return await this.addProductToCart(newCart._id, productId);
    }

    async addProductToCart(cartId: string, productId: string): Promise<ICart> {
        const newCartItem: ICartItem = await this.cartItemService.create({ productId: productId });
        await this.cartModel.updateOne({ _id: cartId }, { $addToSet: { cartItems: newCartItem } });
        return await this.cartModel.findOne({ _id: cartId }).populate('cartItems', null, null, { populate: { path: 'product' } });
    }

    async addProductToCartUser(userId: string, productId: string): Promise<ICart> {
        const cart: ICart = await this.findOneByUser(userId);
        if (!!cart) {
            const cartItem: ICartItem = await this.cartItemService.create({ productId: productId });
            await this.cartModel.updateOne({ _id: cart._id }, { $push: { cartItems: cartItem } })
        }
        return await this.findOneByUser(userId);
    }

    async find(): Promise<ICart[]> {
        return this.cartModel.find();
    }

    async findOneByUser(userId: string): Promise<ICart> {
        return this.cartModel.findOne({ userId: userId });
    }

    async update(cartId: string, updateCartDto: UpdateCartDto): Promise<ICart> {
        return this.cartModel.updateOne({ cartId: cartId }, updateCartDto);
    }

    async delete(id: string): Promise<{ ok?: number, n?: number }> {
        const category = await this.findOneByUser(id);
        if (!category)
            throw new BadRequestException('Product id is not found');
        return await this.cartModel.deleteOne({ _id: id });
    }

}
