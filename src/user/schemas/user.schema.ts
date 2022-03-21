import * as mongoose from 'mongoose';
import { GENDER } from '../enums/gender.enum';
import { ROLE } from '../enums/role.enum';
import { STATUS } from '../enums/status.enum';

export const userSchema = new mongoose.Schema({
  email: { type: String },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.pending,
  },
  avatar: { type: String, default: null },
  avatarId: { type: String, default: null },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true, enum: Object.values(GENDER) },
  address: {
    country: { type: String, default: null },
    city: { type: String, default: null },
    addressLine1: { type: String, default: null },
    addressLine2: { type: String, default: null },
  },
  profession: { type: String, default: null },
  phone: { type: String, default: null, required: true },
  roles: { type: [String], required: true, enum: Object.values(ROLE) },
  password: { type: String, required: true },
});

userSchema.index({ phone: 1 }, { unique: true });
