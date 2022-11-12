import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HOME_CONFIG, homeConfigSchema } from './schemas/home-config.schema';

import { HomeConfigService } from './home-config.service';
import { HomeConfigController } from './home-config.controller';
import { PassportModule } from '@nestjs/passport';
import { CartItemModule } from 'src/cartItem/cartItem.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
    CartItemModule,
    MongooseModule.forFeature([{ name: HOME_CONFIG, schema: homeConfigSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [HomeConfigService],
  controllers: [HomeConfigController],
  exports: [HomeConfigService],
})
export class HomeConfigModule { }
