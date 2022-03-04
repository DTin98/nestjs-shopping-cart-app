import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { STATUS } from '../enums/status.enum';
import { ICart } from '../interfaces/order.interface';

export const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        orderItem: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
        sessionId: { type: String, require: true },
        token: { type: String, require: true },
        price: { type: Number, default: 0 },
        promo: { type: String, default: '' },
        discount: { type: Number, default: 0 },
        subTotal: { type: Number, require: true, default: 0 },
        itemDiscount: { type: Number, require: true, default: 0 },
        tax: { type: Number, default: 0 },
        status: { type: String, default: STATUS.NEW, enum: STATUS },
        shipping: { type: Number, require: true, default: 0 },
        total: { type: Number, require: true, default: 0 },
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

orderSchema.pre<ICart>("save", function (next) {
    this.slug = toSlug(this.title)
    next();
});