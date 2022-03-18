import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SIZE } from '../enums/size.enum';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends CreateProductDto { }
