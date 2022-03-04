import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty()
  cartItem: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  content: string;
}
