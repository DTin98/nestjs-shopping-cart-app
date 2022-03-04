import { Document } from 'mongoose';

export interface ICartItem extends Document {
    product: string,
    cart: string,
    quantity: number
}
