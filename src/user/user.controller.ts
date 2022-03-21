import { Body, Controller, Get, Patch } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { USER_SENSITIVE_FIELDS } from './enums/protected-fields.enum';
import { IReadableUser } from './interfaces/readable-user.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import * as _ from 'lodash';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@User() user: IUser): Promise<IReadableUser> {
    const _user = await this.userService.findOne(user._id);
    const readableUser = _user.toObject() as IReadableUser;
    return _.omit<any>(
      readableUser,
      Object.values(USER_SENSITIVE_FIELDS),
    ) as IReadableUser;
  }

  @Patch('/me')
  async updateMe(
    @User() user: IUser,
    @Body() payload: Partial<IUser>,
  ): Promise<IReadableUser> {
    await this.userService.update(user._id, payload);
    const _user = await this.userService.findOne(user._id);
    const readableUser = _user.toObject() as IReadableUser;
    return _.omit<any>(
      readableUser,
      Object.values(USER_SENSITIVE_FIELDS),
    ) as IReadableUser;
  }
}
