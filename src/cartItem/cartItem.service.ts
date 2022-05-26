import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ICartItem } from './interfaces/cartItem.interface';

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel('CartItem') private readonly cartItemModel: Model<ICartItem>,
  ) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<ICartItem> {
    const {cartId, productId, name} = createCartItemDto;
    const existedCartItem: ICartItem = await this.findByProduct(productId, name);
    if (existedCartItem) {
      await this.cartItemModel.updateOne(
          {cartId, _id: existedCartItem._id, name},
          {$inc: {quantity: +1}},
      );
      return await this.cartItemModel.findOne({_id: existedCartItem._id});
    }
    const cartItem: ICartItem = new this.cartItemModel(createCartItemDto);
    return cartItem.save();
  }

  async find() {
    return;
  }

  async findByProduct(productId: string, name: string): Promise<ICartItem> {
    return this.cartItemModel.findOne({productId: productId, name: name});
  }

  async findOne(id: string): Promise<ICartItem> {
    return this.cartItemModel.findOne({_id: id});
  }

  async updateQuantity(id: string, quantity: number) {
    return this.cartItemModel.updateOne({_id: id}, {quantity: quantity});
  }

  async delete(id: string): Promise<{ ok?: number; n?: number }> {
    const cartItem = await this.findOne(id);
    if (!cartItem) throw new BadRequestException('Cart item id is not found');
    return await this.cartItemModel.deleteOne({ _id: id });
  }
}
