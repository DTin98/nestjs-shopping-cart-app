import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ICartItem } from './interfaces/cartItem.interface';

@Injectable()
export class CartItemService {
    constructor(@InjectModel('CartItem') private readonly cartItemModel: Model<ICartItem>) { }

    async create(createCartItemDto: CreateCartItemDto): Promise<ICartItem> {
        const cartItem = new this.cartItemModel(createCartItemDto);
        return cartItem.save();
    }

    async find(): Promise<ICartItem[]> {
        return this.cartItemModel.find();
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
