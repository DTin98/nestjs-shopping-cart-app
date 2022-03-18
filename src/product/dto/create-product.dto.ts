import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SIZE } from '../enums/size.enum';

export class PriceBySize {
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @ApiProperty({ enum: SIZE, example: SIZE.oneKilograms })
  @IsEnum(SIZE)
  size: SIZE
}

export class ProductMeta {
  @ApiProperty()
  description: string;

  @ApiProperty()
  moreInfo: string
}

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
  @ApiProperty({ type: [PriceBySize] })
  priceBySize: PriceBySize[];

  @ApiProperty({ type: ProductMeta })
  productMeta: ProductMeta;
}
