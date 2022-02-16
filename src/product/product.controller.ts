import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators/public.decorator";
import { CreateProductDto } from "./dto/create-product.dto";
import { IProduct } from "./interfaces/product.interface";
import { ProductService } from "./product.service";

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
        return this.productService.findOne(id);
    }

    @Post('/')
    @Public()
    async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto): Promise<IProduct> {
        return this.productService.create(createProductDto);
    }

    @Delete('/:id')
    @Public()
    async delete(@Param('id') id: string): Promise<{ ok?: number, n?: number }> {
        return this.productService.delete(id);
    }
}
