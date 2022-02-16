import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<IProduct>) { }

    async create(createProductDto: CreateProductDto): Promise<IProduct> {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async find(): Promise<IProduct[]> {
        return this.productModel.find();
    }

    async findOne(id: string): Promise<IProduct> {
        return this.productModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<{ ok?: number, n?: number }> {
        const product = await this.findOne(id);
        if (!product)
            throw new BadRequestException('Product id is not found');
        return await this.productModel.deleteOne({ _id: id });
    }


}
