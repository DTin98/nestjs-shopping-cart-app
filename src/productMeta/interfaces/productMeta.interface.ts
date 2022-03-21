import { Document } from 'mongoose';

export interface IProductMeta extends Document {
  readonly description: string;
  readonly moreInfo: string;
}
