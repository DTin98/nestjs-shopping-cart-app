import { Document } from 'mongoose';
import { GENDER } from '../enums/gender.enum';
import { ROLE } from '../enums/role.enum';
import { IAddress } from './address.interface';

export interface IUser extends Document {
  readonly email: string;
  status: string;
  readonly avatar: string;
  readonly avatarId: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly gender: GENDER;
  readonly address: IAddress;
  readonly profession: string;
  readonly searchField: string;
  readonly phone: string;
  readonly roles: ROLE[];
  readonly password: string;
}
