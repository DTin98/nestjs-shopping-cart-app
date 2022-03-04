import { Document } from 'mongoose';

export interface ICart extends Document {
    title: string,
    metaTitle: string,
    slug: string,
    content: string
}
