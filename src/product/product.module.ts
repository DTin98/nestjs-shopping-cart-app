import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT, productSchema } from './schemas/product.schema';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PassportModule } from '@nestjs/passport';
import { ProductMetaSchema, PRODUCT_META } from 'src/productMeta/schemas/productMeta.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PRODUCT, schema: productSchema }]),
    MongooseModule.forFeature([
      { name: PRODUCT_META, schema: ProductMetaSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule { }
