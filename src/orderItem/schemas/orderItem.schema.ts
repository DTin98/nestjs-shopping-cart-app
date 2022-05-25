import * as mongoose from 'mongoose';
import {SIZE} from "../../product/enums/size.enum";

export const orderItemSchema = new mongoose.Schema(
    {
        productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
        orderId: {type: mongoose.Schema.Types.ObjectId, ref: 'order'},
        price: {type: Number, default: 0},
        size: {type: String, enum: Object.values(SIZE), require: true},
        discount: {type: Number, default: 0},
        quantity: {type: Number, require: true},
    },
    {timestamps: true},
);

orderItemSchema.virtual('product', {
    ref: 'Product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true,
});

orderItemSchema.virtual('order', {
    ref: 'Order',
    localField: 'orderId',
    foreignField: '_id',
    justOne: true,
});

orderItemSchema.set('toObject', {virtuals: true});
orderItemSchema.set('toJSON', {virtuals: true});
