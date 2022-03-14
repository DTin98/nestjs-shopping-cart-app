import { Document } from 'mongoose';

export interface IOrderItem extends Document {
    product: string,
    order: string,
    price: string,
    discount: string,
    quantity: number,
}
