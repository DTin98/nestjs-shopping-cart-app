import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemService } from 'src/cartItem/cartItem.service';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';
import { ProductService } from 'src/product/product.service';
import { CreateHomeConfig } from './dto/create-home-config.dto';
import { UpdateHomeConfigDto } from './dto/update-home-config.dto';
import { IHomeConfig } from './interfaces/home-config.interface';
import { HOME_CONFIG } from './schemas/home-config.schema';

@Injectable()
export class HomeConfigService {
  constructor(
    @InjectModel(HOME_CONFIG) private readonly postModel: Model<IHomeConfig>,
  ) { }

  async create(createBannerUrlDto: CreateHomeConfig): Promise<IHomeConfig> {
    // const post = await this.findOneByTitle(createPostDto.title);
    // if (post) {
    //   throw new BadRequestException('Post already exists!');
    // }
    const createdPost = new this.postModel(createBannerUrlDto);
    return await createdPost.save();
  }

  async findAll(): Promise<IHomeConfig> {
    const homeConfigs = await this.postModel.find().exec()
    return homeConfigs[0];
  }

  async findOne(id: string): Promise<IHomeConfig> {
    return await this.postModel.findOne({ _id: id }).exec();
  }

  async findOneByTitle(title: string): Promise<IHomeConfig> {
    return await this.postModel.findOne({ title }).exec();
  }

  async findOneAndUpdate(updatePostDto: UpdateHomeConfigDto): Promise<IHomeConfig> {
    const preHomeConfig = await this.postModel.findOne({}).exec();
    const updatedPost = await this.postModel.findOneAndUpdate({}, { ...preHomeConfig.toJSON(), ...updatePostDto }).exec();
    // if (!updatedPost) {
    //   throw new BadRequestException('Post id not found!');
    // }
    return updatedPost;
  }

  async findOneAndDelete(id: string): Promise<IHomeConfig> {
    const deletedPost = await this.postModel.findOneAndDelete({ _id: id }).exec();
    if (!deletedPost) {
      throw new BadRequestException('Post not found!');
    }
    return deletedPost;
  }

  async deleteAll(): Promise<any> {
    return await this.postModel.deleteMany({});
  }

  async deleteOne(slug: string): Promise<any> {
    return await this.postModel.deleteOne({ slug }).exec();
  }

  async deleteById(id: string): Promise<any> {
    return await this.postModel.deleteOne({ _id: id }).exec();
  }

  async findById(id: string): Promise<IHomeConfig> {
    return;
  }
}
