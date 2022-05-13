import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { CART_STATUS } from '../enums/cart-status.enum';
import { ICart } from '../interfaces/cart.interface';

export const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
    price: { type: Number, default: 0 },
    sessionId: { type: String, require: true },
    token: { type: String, require: true },
    status: {
      type: String,
      default: CART_STATUS.NEW,
      enum: Object.values(CART_STATUS),
    },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phone: { type: Number, require: true },
    email: { type: Number, require: true },
    address: {type: String, require: true},
    content: { type: String, default: '' },
  },
  { timestamps: true },
);
