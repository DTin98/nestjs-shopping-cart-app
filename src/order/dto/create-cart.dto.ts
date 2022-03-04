import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  metaTitle: string;

  @ApiProperty()
  content: string;
}
