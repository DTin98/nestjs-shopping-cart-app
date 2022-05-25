import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {SIZE} from "../../product/enums/size.enum";

export class CreateCartItemDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: string;

  @ApiProperty()
  @IsOptional()
  quantity?: number;

  @ApiProperty()
  @IsEnum(SIZE)
  size: SIZE;

  @ApiProperty()
  @IsOptional()
  metaTitle?: string;

  @ApiProperty()
  @IsOptional()
  content?: string;
}
