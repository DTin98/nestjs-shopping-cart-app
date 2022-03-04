import { Document } from 'mongoose';

export interface ICategory extends Document {
    title: string,
    metaTitle: string,
    slug: string,
    content: string
}
