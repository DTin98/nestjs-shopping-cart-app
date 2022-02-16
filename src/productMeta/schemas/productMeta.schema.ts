import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const ProductMetaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    describe: { type: String, default: '' },
    moreInfo: { type: String, default: '' },
});
