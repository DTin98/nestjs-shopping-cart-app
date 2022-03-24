import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { STATUS } from './enums/status.enum';
import { SALT_ROUNDS } from './constant';

@Injectable()
export class UserService {
  private readonly saltRounds = SALT_ROUNDS;

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(
    createUserDto: CreateUserDto,
    roles: string[],
    status: STATUS,
    options?: mongoose.ConnectionOptions,
  ): Promise<IUser> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(
      _.assignIn(createUserDto, { password: hash, roles, status }),
    );
    return await createdUser.save({ ...options });
  }

  async find(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByPhone(phone: string): Promise<IUser> {
    return await this.userModel.findOne({ phone }).exec();
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({ _id: id }, payload);
  }
}
