import { Document } from 'mongoose';
import { IOrderItem } from 'src/orderItem/interfaces/orderItem.interface';
import { STATUS } from '../enums/status.enum';

export interface IOrder extends Document {
    price: number,
    promo: string,
    discount: number,
    subTotal: number,
    itemDisplay: number,
    tax: number,
    status: STATUS,
    shipping: number,
    total: number,
    firstName: string,
    lastName: string,
    phone: number,
    email: number,
    orderItems: IOrderItem[],
    address: {
        country: string,
        city: string,
        addressLine1: string,
        addressLine2: string,
    }
}
