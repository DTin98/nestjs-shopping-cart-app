import { Document } from 'mongoose';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';

export interface ICart extends Document {
  cartItems: Array<ICartItem>;
  title: string;
  metaTitle: string;
  slug: string;
  content: string;
}
