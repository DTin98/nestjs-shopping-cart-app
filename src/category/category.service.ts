import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-product.dto';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<ICategory>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ICategory> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async find(): Promise<ICategory[]> {
    return this.categoryModel.find();
  }

  async findOne(id: string): Promise<ICategory> {
    return this.categoryModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<{ ok?: number; n?: number }> {
    const category = await this.findOne(id);
    if (!category) throw new BadRequestException('Product id is not found');
    return await this.categoryModel.deleteOne({ _id: id });
  }
}
