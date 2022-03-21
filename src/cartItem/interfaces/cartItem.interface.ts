import { Document } from 'mongoose';
import { IProduct } from 'src/product/interfaces/product.interface';

export interface ICartItem extends Document {
  productId: string;
  product: IProduct;
  cart: string;
  quantity: number;
}
