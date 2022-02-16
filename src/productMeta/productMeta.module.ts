import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMetaSchema } from './schemas/productMeta.schema';

import { ProductMetaService } from './productMeta.service';
import { ProductMetaController } from './productMeta.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ProductMeta', schema: ProductMetaSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),],
  providers: [ProductMetaService],
  controllers: [ProductMetaController],
  exports: [ProductMetaService],
})
export class ProductMetaModule { }
