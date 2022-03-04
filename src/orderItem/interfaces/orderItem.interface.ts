import { Document } from 'mongoose';

export interface ICartItem extends Document {
    title: string,
    metaTitle: string,
    slug: string,
    content: string
}
