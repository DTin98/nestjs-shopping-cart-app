import * as mongoose from 'mongoose';
import { toSlug } from 'src/utils/string.util';
import { IHomeConfig } from '../interfaces/home-config.interface';
import { v4 as uuidv4 } from 'uuid';

export const HOME_CONFIG = 'HOME_CONFIG';

export const homeConfigSchema = new mongoose.Schema(
  {
    coverImg: { type: 'string', default: '' },
    bannerImgs: [{
      smallImg: { type: 'string', default: '' },
      largeImg: { type: 'string', default: '' }
    }],
  },
  { timestamps: true },
);

// postSchema.pre<IPost>('save', function (next) {
//     this.slug = toSlug(this.title) + uuidv4();
//     next();
// });
