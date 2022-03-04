import * as mongoose from 'mongoose';

export const cartItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, require: true },
        active: { type: Boolean, default: true },
        content: { type: String, default: '' },
    },
    { timestamps: true }
);