import * as mongoose from 'mongoose';
import { SIZE } from '../enums/size.enum';

export const priceBySizeSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        size: { type: String, required: true, enum: Object.values(SIZE) },
        price: { type: Number, required: true },
    },
);

priceBySizeSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

priceBySizeSchema.set('toObject', { virtuals: true });
priceBySizeSchema.set('toJSON', { virtuals: true });