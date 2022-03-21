import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SIZE } from '../enums/size.enum';
import { CreateProductDto, PriceBySize, ProductMeta } from './create-product.dto';
import { IPriceBySize } from '../interfaces/product.interface';
import { IProductMeta } from 'src/productMeta/interfaces/productMeta.interface';

export class UpdateProductDto {
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
