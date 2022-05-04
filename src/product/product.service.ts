import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductMeta } from 'src/productMeta/interfaces/productMeta.interface';
import { PRODUCT_META } from 'src/productMeta/schemas/productMeta.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/product.interface';
import { PRODUCT } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(PRODUCT)
        private readonly productModel: Model<IProduct>,
        @InjectModel(PRODUCT_META)
        private readonly productMetaModel: Model<IProductMeta>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<IProduct> {
        //find product by title if exist then throw error
        const product = await this.productModel.findOne({
            title: createProductDto.title,
        });

        if (product)
            throw new BadRequestException('Product title is already exist');

        if (createProductDto.productMeta) {
            const newProductMeta = await new this.productMetaModel(
                createProductDto.productMeta,
            ).save();
            const newProduct = new this.productModel({
                ...createProductDto,
                productMetaId: newProductMeta._id,
            });
            return await newProduct.save();
        } else {
            const newProduct = new this.productModel(createProductDto);
            return await newProduct.save();
        }
    }

    async find(): Promise<IProduct[]> {
        return this.productModel.find();
    }

    async findOne(id: string): Promise<IProduct> {
        return await this.productModel.findOne({ _id: id }).exec();
    }

    async findOneBySlug(slug: string): Promise<IProduct> {
        return await this.productModel.findOne({ slug }).exec();
    }

    async update(
        id: string,
        updateProductDto: UpdateProductDto,
    ): Promise<IProduct> {
        //find product by id if exist then throw error
        const product = await this.productModel.findOne({ _id: id });
        if (!product) throw new BadRequestException('Product id is not found');

        if (updateProductDto.productMeta) {
            await this.productMetaModel.updateOne({ _id: product.productMetaId }, updateProductDto.productMeta);
        }

        await this.productModel.updateOne({ _id: product._id }, updateProductDto);
        return await this.findOne(id);
    }

    async delete(id: string): Promise<{ ok?: number; n?: number }> {
        const product = await this.findOne(id);
        if (!product) throw new BadRequestException('Product id is not found');
        return await this.productModel.deleteOne({ _id: id });
    }
}
