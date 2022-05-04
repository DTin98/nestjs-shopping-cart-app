import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartItemService } from 'src/cartItem/cartItem.service';
import { ICartItem } from 'src/cartItem/interfaces/cartItem.interface';
import { ProductService } from 'src/product/product.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IPost } from './interfaces/post.interface';
import { POST } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(POST) private readonly postModel: Model<IPost>,
  ) { }

  async create(createPostDto: CreatePostDto): Promise<IPost> {
    const post = await this.findOneByTitle(createPostDto.title);
    if (post) {
      throw new BadRequestException('Post already exists!');
    }
    const createdPost = new this.postModel(createPostDto);
    return await createdPost.save();
  }

  async findAll(): Promise<IPost[]> {
    return await this.postModel.find().exec();
  }

  async findOne(id: string): Promise<IPost> {
    return await this.postModel.findOne({ _id: id }).exec();
  }

  async findOneBySlug(slug: string): Promise<IPost> {
    return await this.postModel.findOne({ slug }).exec();
  }

  async findOneByTitle(title: string): Promise<IPost> {
    return await this.postModel.findOne({ title }).exec();
  }

  async findOneAndUpdate(id: string, updatePostDto: UpdatePostDto): Promise<IPost> {
    const updatedPost = await this.postModel.findOneAndUpdate({ id }, updatePostDto, { new: true }).exec();
    if (!updatedPost) {
      throw new BadRequestException('Post not found!');
    }
    return updatedPost;
  }

  async findOneAndDelete(id: string): Promise<IPost> {
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

  async findById(id: string): Promise<IPost> {
    return;
  }
}
