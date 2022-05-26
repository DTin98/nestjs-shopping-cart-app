import * as mongoose from 'mongoose';
import {SIZE} from '../../product/enums/size.enum';

export const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true,
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            require: true,
        },
        name: {type: String, require: true},
        size: {type: String, enum: Object.values(SIZE), required: true},
        discount: {type: Number, default: 0},
        quantity: {type: Number, default: 1},
        active: {type: Boolean, default: true},
        content: {type: String, default: ''},
    },
    {timestamps: true},
);

cartItemSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true,
});

cartItemSchema.set('toObject', {virtuals: true});
cartItemSchema.set('toJSON', {virtuals: true});
