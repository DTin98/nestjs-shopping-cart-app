import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { STATUS } from '../enums/status.enum';
import { ICart } from '../interfaces/cart.interface';

export const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
        price: { type: Number, default: 0 },
        sessionId: { type: String, require: true },
        token: { type: String, require: true },
        status: { type: String, default: STATUS.NEW, enum: Object.values(STATUS) },
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        phone: { type: Number, require: true },
        email: { type: Number, require: true },
        address: {
            country: { type: String, default: null },
            city: { type: String, default: null },
            addressLine1: { type: String, default: null },
            addressLine2: { type: String, default: null },
        },
        content: { type: String, default: '' },
    },
    { timestamps: true }
);