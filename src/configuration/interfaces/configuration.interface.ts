import {Document} from 'mongoose';
import {IProductMeta} from 'src/productMeta/interfaces/productMeta.interface';

export interface IConfiguration extends Document {
    readonly contact: IContact;
    readonly homePage: string;
    readonly aboutPage: string;
    readonly deliveryPolicyPage: string;
    readonly paymentGuidePage: string;
}

export interface IContact {
    readonly fanPage: string;
    readonly zalo: string;
    readonly phone: string;
    readonly email: string;
    readonly address: string;
    readonly bankAccount: string;
    readonly bankAccountName: string;
    readonly bankName: string;
}
