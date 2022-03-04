import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { ICart } from './interfaces/order.interface';

@Injectable()
export class CartService {
    constructor(@InjectModel('Category') private readonly categoryModel: Model<ICart>) { }

    async create(createCategoryDto: CreateCartDto): Promise<ICart> {
        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }

    async find(): Promise<ICart[]> {
        return this.categoryModel.find();
    }

    async findOne(id: string): Promise<ICart> {
        return this.categoryModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<{ ok?: number, n?: number }> {
        const category = await this.findOne(id);
        if (!category)
            throw new BadRequestException('Product id is not found');
        return await this.categoryModel.deleteOne({ _id: id });
    }

}
