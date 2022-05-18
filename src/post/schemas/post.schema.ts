import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import {IPost} from '../interfaces/post.interface';
import {v4 as uuidv4} from 'uuid';

export const POST = 'POST';

export const postSchema = new mongoose.Schema(
  {
      title: {type: String, default: ''},
      content: {type: String, default: ''},
      image: {type: String, default: ''},
      isHighlight: {type: Boolean, default: false},
      summary: {type: String, default: ''},
      slug: {type: String, index: {unique: true}},
  },
  { timestamps: true },
);

postSchema.pre<IPost>('save', function (next) {
    this.slug = toSlug(this.title) + uuidv4();
    next();
});
