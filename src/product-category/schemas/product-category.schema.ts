import * as mongoose from 'mongoose';

export const ProductCategorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
