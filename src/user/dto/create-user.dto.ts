import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAddressDto } from './create-address.dto';
import { GENDER } from '../enums/gender.enum';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    readonly avatar: string;
    readonly avatarId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(GENDER)
    readonly gender: string;

    @IsOptional()
    @ApiPropertyOptional()
    readonly address: CreateAddressDto;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly profession: string;

    readonly searchField: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly phone: string;

    readonly roles: string[];

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Weak password' },
    )
    @ApiProperty()
    readonly password: string;
}
