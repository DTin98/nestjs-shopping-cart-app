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
  gender: { type: String, enum: Object.values(GENDER) },
  address: { type: String, default: '' },
  phone: { type: String, default: null, required: true },
  roles: { type: [String], required: true, enum: Object.values(ROLE) },
  password: { type: String, required: true },
});

userSchema.index({ phone: 1 }, { unique: true });
