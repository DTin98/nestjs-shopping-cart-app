import { Document } from 'mongoose';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  image: string;
}