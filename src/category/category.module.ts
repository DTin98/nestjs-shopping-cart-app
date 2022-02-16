import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';

import { ProductService } from './category.service';
import { CategoryController } from './category.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: CategorySchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [ProductService],
  controllers: [CategoryController],
  exports: [ProductService],
})
export class CategoryModule { }
