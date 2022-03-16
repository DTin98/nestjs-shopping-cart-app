import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { SIZE } from '../enums/size.enum';
import { IProduct } from '../interfaces/product.interface';

export const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: { type: String, unique: true },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        maxPrice: { type: Number, default: 0 },
        isHighlight: { type: Boolean, default: false },
        summary: { type: String, default: '' },
        content: { type: String, default: '' },
        rating: { type: Number, default: 0 },
        productMeta: { type: mongoose.Schema.Types.ObjectId, ref: "ProductMeta" },
        category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
        priceBySize: [{
            price: { type: Number, default: 0, required: true },
            size: { type: String, enum: Object.values(SIZE), required: true }
        }],
    },
    { timestamps: true }
);

productSchema.pre<IProduct>("save", function (next) {
    this.slug = toSlug(this.title)
    next();
});