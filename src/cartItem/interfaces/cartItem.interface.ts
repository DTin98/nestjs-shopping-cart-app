import { Document } from 'mongoose';

export interface ICartItem extends Document {
    productId: string,
    product: string,
    cart: string,
    quantity: number
}
