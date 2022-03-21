import { Document } from 'mongoose';
import { IOrderItem } from 'src/orderItem/interfaces/orderItem.interface';
import { STATUS } from '../enums/status.enum';

export interface IOrder extends Document {
  promo?: string;
  discount?: number;
  subTotal: number;
  tax: number;
  status?: STATUS;
  shipping?: number;
  total: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  orderItems?: IOrderItem[];
  address?: {
    city: string;
    addressLine1: string;
    addressLine2: string;
  };
}
