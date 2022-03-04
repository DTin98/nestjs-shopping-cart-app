import * as mongoose from 'mongoose';

export const cartItemSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
        price: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        quantity: { type: Number, default: 1 },
        active: { type: Boolean, default: true },
        content: { type: String, default: '' },
    },
    { timestamps: true }
);

cartItemSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

cartItemSchema.set('toObject', { virtuals: true });
cartItemSchema.set('toJSON', { virtuals: true });