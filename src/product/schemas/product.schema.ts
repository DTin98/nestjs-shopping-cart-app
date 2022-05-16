import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { SIZE } from '../enums/size.enum';
import { IProduct } from '../interfaces/product.interface';

export const PRODUCT = 'Product';

export const productSchema = new mongoose.Schema(
  {
      title: {type: String, required: true, unique: true},
      slug: {type: String, index: {unique: true}},
      quantity: {type: Number, default: 0},
      price: {type: Number, default: 0},
      image: {type: String, default: ''},
      maxPrice: {type: Number, default: 0},
      isHighlight: {type: Boolean, default: false},
      summary: {type: String, default: ''},
      content: {type: String, default: ''},
      rating: {type: Number, default: 0},
      productMetaId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProductMeta'},
      category: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
      priceBySize: [
          {
              price: {type: Number, default: 0, required: true},
              size: {type: String, enum: Object.values(SIZE), required: true},
          },
      ],
  },
  { timestamps: true },
);

productSchema.pre<IProduct>('save', function (next) {
  this.slug = toSlug(this.title);
  next();
});

productSchema.virtual('productMeta', {
  ref: 'productMeta',
  localField: 'productMetaId',
  foreignField: '_id',
  justOne: true,
});

productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });
