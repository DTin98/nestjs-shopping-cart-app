import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto {
  @ApiProperty()
  productId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  quantity?: number;

  @ApiProperty()
  @IsOptional()
  metaTitle?: string;

  @ApiProperty()
  @IsOptional()
  content?: string;
}
