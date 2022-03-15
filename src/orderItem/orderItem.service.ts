import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-product.dto';
import { IOrderItem } from './interfaces/orderItem.interface';

@Injectable()
export class OrderItemService {
    constructor(@InjectModel('OrderItem') private readonly orderItemModel: Model<IOrderItem>) { }

    async create(createCategoryDto: CreateCategoryDto): Promise<IOrderItem> {
        const category = new this.orderItemModel(createCategoryDto);
        return category.save();
    }

    async find(): Promise<IOrderItem[]> {
        return this.orderItemModel.find();
    }

    async findOne(id: string): Promise<IOrderItem> {
        return this.orderItemModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<{ ok?: number, n?: number }> {
        const category = await this.findOne(id);
        if (!category)
            throw new BadRequestException('Product id is not found');
        return await this.orderItemModel.deleteOne({ _id: id });
    }

}
