import { Document } from 'mongoose';
import { IProductMeta } from 'src/productMeta/interfaces/productMeta.interface';

export interface IConfiguration extends Document {
  readonly title: string;
}
