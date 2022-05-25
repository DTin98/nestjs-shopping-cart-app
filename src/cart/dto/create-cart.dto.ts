import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {SIZE} from "../../product/enums/size.enum";

export class CreateCartDto {
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(SIZE)
  size: SIZE;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  content: string;
}
