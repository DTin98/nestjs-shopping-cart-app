import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategorySchema } from './schemas/product-category.schema';

import { ProductService } from './product-category.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ProductCategory', schema: ProductCategorySchema }]),
  ],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductCategoryModule { }
