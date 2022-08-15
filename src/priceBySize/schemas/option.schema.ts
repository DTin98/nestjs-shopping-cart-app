import * as mongoose from 'mongoose';
import { SIZE } from 'src/product/enums/size.enum';
import { IProduct } from 'src/product/interfaces/product.interface';
import { toSlug } from 'src/utils/string.util';
import { v4 as uuidv4 } from 'uuid';
import { TYPE } from '../enums/type.enum';

export const OPTION = 'OPTION';

export const optionSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        inputType: { type: String, enum: Object.values(TYPE), required: true },
        options: [
            {
                title: { type: String, required: true },
                price: { type: Number, default: 0 },
                text: { type: String, required: true },
                image: { type: String, required: true },
                isSelected: { type: Boolean, default: false },
            },
        ],
    },
    { timestamps: true },
);
