import * as mongoose from 'mongoose';

export const CONFIGURATION = 'CONFIGURATION';

export const configurationSchema = new mongoose.Schema(
  {
    homePage: { type: String, default: '' },
    aboutPage: { type: String, default: '' },
    deliveryPolicyPage: { type: String, default: '' },
    paymentGuidePage: { type: String, default: '' },
    contact: {
      fanPage: { type: String, default: '' },
      zalo: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      bankAccount: { type: String, default: '' },
      bankAccountName: { type: String, default: '' },
      bankName: { type: String, default: '' },
    },
  },
  { timestamps: true },
);
