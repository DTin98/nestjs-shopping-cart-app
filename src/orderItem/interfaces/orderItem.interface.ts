import { Document } from 'mongoose';
import { IOrder } from 'src/order/interfaces/order.interface';
import { IProduct } from 'src/product/interfaces/product.interface';

export interface IOrderItem extends Document {
  productId: string;
  product?: IProduct;
  orderId: string;
  order?: IOrder;
  discount?: string;
  quantity: number;
}
