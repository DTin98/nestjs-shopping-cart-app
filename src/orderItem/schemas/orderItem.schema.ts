import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { ICartItem } from '../interfaces/orderItem.interface';

export const orderItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        order: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, require: true },
        active: { type: Boolean, default: true },
        content: { type: String, default: '' },
    },
    { timestamps: true }
);

orderItemSchema.pre<ICartItem>("save", function (next) {
    this.slug = toSlug(this.title)
    next();
});