import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { ICategory } from '../interfaces/category.interface';

export const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  metaTitle: { type: String },
  slug: { type: String },
  content: { type: String },
});

categorySchema.pre<ICategory>('save', function(next) {
  this.slug = toSlug(this.title);
  next();
});
