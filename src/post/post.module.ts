import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { POST, postSchema } from './schemas/post.schema';

import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';
import { CartItemModule } from 'src/cartItem/cartItem.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
    CartItemModule,
    MongooseModule.forFeature([{ name: POST, schema: postSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule { }
