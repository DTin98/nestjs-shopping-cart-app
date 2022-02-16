import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    metaTitle: { type: String },
    slug: { type: String },
    content: { type: String }
});
