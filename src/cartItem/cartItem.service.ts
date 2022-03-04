import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ICartItem } from './interfaces/cartItem.interface';

@Injectable()
export class CartItemService {
    constructor(@InjectModel('CartItem') private readonly cartItemModel: Model<ICartItem>) { }

    async create(createCartItemDto: CreateCartItemDto): Promise<ICartItem> {
        const { productId } = createCartItemDto;
        const existedCartItem: ICartItem = await this.findByProduct(productId);
        if (existedCartItem) {
            await this.cartItemModel.updateOne({ _id: existedCartItem._id }, { $inc: { quantity: +1 } })
            return await this.cartItemModel.findOne({ _id: existedCartItem._id });
        }
        const cartItem: ICartItem = new this.cartItemModel(createCartItemDto);
        return cartItem.save();
    }

    async find() {
        return;
    }

    async findByProduct(productId: string): Promise<ICartItem> {
        return this.cartItemModel.findOne({ productId: productId });
    }

    async findOne(id: string): Promise<ICartItem> {
        return this.cartItemModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<{ ok?: number, n?: number }> {
        const category = await this.findOne(id);
        if (!category)
            throw new BadRequestException('Product id is not found');
        return await this.cartItemModel.deleteOne({ _id: id });
    }

}
