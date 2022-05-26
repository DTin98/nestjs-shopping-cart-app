import { Document } from 'mongoose';
import {IProduct} from 'src/product/interfaces/product.interface';
import {SIZE} from "../../product/enums/size.enum";

export interface ICartItem extends Document {
    productId: string;
    name: string;
    product: IProduct;
    cart: string;
    quantity: number;
    size: SIZE;
}
