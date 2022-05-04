import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ROLE } from 'src/user/enums/role.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/product.interface';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get('/')
    @Public()
    async getAll(): Promise<IProduct[]> {
        return this.productService.find();
    }

    @Get('/:id')
    @Public()
    async getOne(@Param('id') id: string): Promise<IProduct> {
        return await this.productService.findOne(id);
    }

    @Get('/:slug')
    @Public()
    async getSlug(@Param('slug') slug: string): Promise<IProduct> {
        return this.productService.findOneBySlug(slug);
    }

    @Post('/')
    @Roles(ROLE.admin)
    async create(
        @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    ): Promise<IProduct> {
        return await this.productService.create(createProductDto);
    }

    @Patch('/:id')
    @Roles(ROLE.admin)
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
    ): Promise<IProduct> {
        return await this.productService.update(id, updateProductDto);
    }

    @Delete('/:id')
    @Roles(ROLE.admin)
    async delete(@Param('id') id: string): Promise<{ ok?: number; n?: number }> {
        return await this.productService.delete(id);
    }
}
