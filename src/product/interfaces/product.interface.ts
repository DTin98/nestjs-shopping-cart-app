import { Document } from 'mongoose';
import { IProductMeta } from 'src/productMeta/interfaces/productMeta.interface';
import { SIZE } from '../enums/size.enum';
export interface IPriceBySize extends Document {
    readonly price: number,
    readonly size: SIZE
}
export interface IProduct extends Document {
    readonly title: string;
    slug: string;
    readonly quantity: number;
    readonly price: number;
    readonly maxPrice: number;
    readonly summary: string;
    readonly content: string;
    readonly rating: number;
    readonly productBySize: IPriceBySize[];
    productMetaId: string;
    readonly productMeta: IProductMeta;
}
