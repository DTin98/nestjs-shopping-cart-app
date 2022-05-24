import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemService } from 'src/cartItem/cartItem.service';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';
import { ProductService } from 'src/product/product.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ICart } from './interfaces/cart.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<ICart>,
    private productService: ProductService,
    private readonly cartItemService: CartItemService,
  ) { }

  async getUserCart(userId: string): Promise<ICart> {
    return this.cartModel
        .findOne({userId})
      .populate('cartItems', null, null, { populate: { path: 'product' } });
  }

  async getCart(cartId: string): Promise<ICart> {
    return this.cartModel
      .findOne({ _id: cartId })
      .populate('cartItems', null, null, { populate: { path: 'product' } });
  }

  async createCartUser(
    userId: string,
    productId: string,
    createCartDto: CreateCartDto,
  ): Promise<ICart> {
    const cart = await this.findOneByUser(userId);
    if (!!cart) {
      return await this.addProductToCart(cart._id, productId);
    }
    const newCart = new this.cartModel({userId, ...createCartDto});
    await newCart.save();
    return await this.addProductToCart(newCart._id, productId);
  }

  async addProductToCart(cartId: string, productId: string): Promise<ICart> {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new BadRequestException('Product id is not found');
    }

    const newCartItem = await this.cartItemService.create({
      productId,
    });
    await this.cartModel.updateOne(
        {_id: cartId},
        {$addToSet: {cartItems: newCartItem}},
    );
    return this.cartModel
        .findOne({_id: cartId})
        .populate('cartItems', null, null, {populate: {path: 'product'}});
  }

  async addProductToUserCart(
    userId: string,
    productId: string,
  ): Promise<ICart> {
    const cart = await this.findOneByUser(userId);
    if (!!cart) {
      const cartItem = await this.cartItemService.create({
        productId,
      });
      await this.cartModel.updateOne(
        { _id: cart._id },
        { $addToSet: { cartItems: cartItem } },
      );
    }
    return await this.findOneByUser(userId);
  }

  async find(): Promise<ICart[]> {
    return this.cartModel.find();
  }

  async findOneByUser(userId: string): Promise<ICart> {
    return this.cartModel.findOne({userId});
  }

  async update(cartId: string, updateCartDto: UpdateCartDto): Promise<ICart> {
    const cart = await this.cartModel
      .findOne({ _id: cartId })
      .populate('cartItems');
    if (!cart) {
      throw new BadRequestException('Cart id is not found');
    }

    const cartItemsIds = cart.cartItems.map(e => e._id);
    const cartItemIdsToUpdate = updateCartDto.cartItems.filter(e =>
      cartItemsIds.includes(e.id),
    );

    for (const cartItem of cartItemIdsToUpdate) {
      if (cartItem.quantity) {
        await this.cartItemService.updateQuantity(
            cartItem.id,
            cartItem.quantity,
        );
      } else {
        await this.cartItemService.delete(cartItem.id);
      }
    }

    return await this.getCart(cart._id);
  }

  async delete(
    userId: string,
    cartItemId: string,
  ): Promise<{ ok?: number; n?: number }> {
    const userCart = await this.findOneByUser(userId);
    if (
        !userCart.cartItems.find(e => e._id.toString() === cartItemId.toString())
    ) {
      throw new BadRequestException('Cart item id is not found');
    }

    return await this.cartItemService.delete(cartItemId);
  }
}
