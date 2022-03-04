import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators/public.decorator";
import { CartItemService } from "./cartItem.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { ICartItem } from "./interfaces/cartItem.interface";

@Controller('categories')
@ApiTags('category')
export class CartItemController {
    constructor(private readonly categoryService: CartItemService) { }

    @Get('/')
    @Public()
    async getAll(): Promise<ICartItem[]> {
        return this.categoryService.find();
    }

    @Get('/:id')
    @Public()
    async getOne(@Param('id') id: string): Promise<ICartItem> {
        return this.categoryService.findOne(id);
    }

    @Post('/')
    @Public()
    async create(@Body(new ValidationPipe()) createCategoryDto: CreateCartItemDto): Promise<ICartItem> {
        return this.categoryService.create(createCategoryDto);
    }

    @Delete('/:id')
    @Public()
    async delete(@Param('id') id: string): Promise<{ ok?: number, n?: number }> {
        return this.categoryService.delete(id);
    }
}
