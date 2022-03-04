import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  content: string;
}
