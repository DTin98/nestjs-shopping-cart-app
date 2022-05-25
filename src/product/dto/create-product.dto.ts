import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SIZE } from '../enums/size.enum';
import { IPriceBySize } from '../interfaces/product.interface';
import { IProductMeta } from 'src/productMeta/interfaces/productMeta.interface';

export class PriceBySize {
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @ApiProperty({enum: SIZE, example: SIZE._1kg})
  @IsEnum(SIZE)
  size: SIZE;
}

export class ProductMeta {
  @ApiProperty()
  description: string;

  @ApiProperty()
  moreInfo: string;
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
  priceBySize: IPriceBySize[];

  @ApiProperty({ type: ProductMeta })
  productMeta: IProductMeta;
}
