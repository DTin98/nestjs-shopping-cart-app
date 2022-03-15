import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
