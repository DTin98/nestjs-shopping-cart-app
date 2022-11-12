import { Document } from 'mongoose';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';

export interface IHomeConfig extends Document {
  bannerUrls: string[];
}