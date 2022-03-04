import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators/public.decorator";
import { CartService } from "./order.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { ICart } from "./interfaces/order.interface";

@Controller('categories')
@ApiTags('category')
export class CartController {
    constructor(private readonly categoryService: CartService) { }

    @Get('/')
    @Public()
    async getAll(): Promise<ICart[]> {
        return this.categoryService.find();
    }

    @Get('/:id')
    @Public()
    async getOne(@Param('id') id: string): Promise<ICart> {
        return this.categoryService.findOne(id);
    }

    @Post('/')
    @Public()
    async create(@Body(new ValidationPipe()) createCategoryDto: CreateCartDto): Promise<ICart> {
        return this.categoryService.create(createCategoryDto);
    }

    @Delete('/:id')
    @Public()
    async delete(@Param('id') id: string): Promise<{ ok?: number, n?: number }> {
        return this.categoryService.delete(id);
    }
}
