import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { STATUS } from '../enums/status.enum';
import { IOrder } from '../interfaces/order.interface';

export const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
    promo: { type: String, default: '' },
    discount: { type: Number, default: 0 },
    subTotal: { type: Number, require: true, default: 0 },
    itemDiscount: { type: Number, require: true, default: 0 },
    tax: { type: Number, default: 0 },
    status: { type: String, default: STATUS.NEW, enum: Object.values(STATUS) },
    shipping: { type: Number, require: true, default: 0 },
    total: { type: Number, require: true, default: 0 },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    address: { type: String, require: true },
    content: { type: String, default: '' },
  },
  { timestamps: true },
);
