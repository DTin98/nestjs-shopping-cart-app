import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @IsNotEmpty()
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  content: string;
}
