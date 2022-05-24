import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { USER_SENSITIVE_FIELDS } from './enums/protected-fields.enum';
import { IReadableUser } from './interfaces/readable-user.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import * as _ from 'lodash';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ROLE } from './enums/role.enum';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles(ROLE.admin)
  async get(): Promise<IReadableUser[]> {
    const _user = await this.userService.find();
    return _user.map(user =>
      _.omit<any>(
        user,
        Object.values(USER_SENSITIVE_FIELDS),
      ) as IReadableUser
    )
  }

  @Patch('/:id')
  @Roles(ROLE.admin)
  async update(@Param('id') id: string, @Body() payload: Partial<IUser>): Promise<IReadableUser> {
    const user = await this.userService.findOneAndUpdate(id, payload);
    return _.omit<any>(
        user,
        Object.values(USER_SENSITIVE_FIELDS),
    ) as IReadableUser;
  }

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
