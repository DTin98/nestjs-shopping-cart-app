import { Document } from 'mongoose';

export interface IProduct extends Document {
    readonly title: string;
    slug: string;
    readonly quantity: number;
    readonly price: number;
    readonly maxPrice: number;
    readonly summary: string;
    readonly content: string;
    readonly rating: number;
    readonly size: string;
}
