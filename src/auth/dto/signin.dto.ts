import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class SignInDto {
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'Phone number is incorrect format' })
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  password: string;
}
