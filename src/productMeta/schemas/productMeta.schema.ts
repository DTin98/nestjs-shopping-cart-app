import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { TEXT_CONTENT_TYPE } from '../enums/textContentType.enum';

export const ProductMetaSchema = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    description: { type: String, default: '' },
    moreInfo: { type: String, default: '' },
});

ProductMetaSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

ProductMetaSchema.set('toObject', { virtuals: true });
ProductMetaSchema.set('toJSON', { virtuals: true });