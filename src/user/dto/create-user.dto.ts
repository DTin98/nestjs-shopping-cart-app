import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { GENDER } from '../enums/gender.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly avatar: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(GENDER)
  readonly gender: GENDER;

  @IsOptional()
  @ApiPropertyOptional()
  readonly address: CreateAddressDto;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profession: string;

  @ApiProperty()
  @Matches(/^[0-9]+$/, { message: 'Phone number is incorrect format' })
  @IsString()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  readonly password: string;

  readonly searchField: string;
  readonly roles: string[];
}
