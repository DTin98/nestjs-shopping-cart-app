import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SIZE } from '../enums/size.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  maxPrice: number;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @IsEnum(SIZE)
  @ApiProperty()
  size: string;
}
