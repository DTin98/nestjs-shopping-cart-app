import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators/public.decorator";
import { User } from "src/shared/decorators/user.decorator";
import { IUser } from "src/user/interfaces/user.interface";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { ICart } from "./interfaces/cart.interface";

@Controller('cart')
@ApiTags('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get('/')
    @Public()
    async getAll(): Promise<ICart[]> {
        return this.cartService.find();
    }

    @Get('/:id')
    @Public()
    async getOne(@Param('id') id: string): Promise<ICart> {
        return this.cartService.findOne(id);
    }

    @Post('/add-product/:productId')
    async createCart(@User() user: IUser, @Param('productId') productId: string, @Body(new ValidationPipe()) createCartDto: CreateCartDto): Promise<ICart> {
        return this.cartService.createCartUser(user._id, productId, createCartDto);
    }

    @Delete('/:id')
    @Public()
    async delete(@Param('id') id: string): Promise<{ ok?: number, n?: number }> {
        return this.cartService.delete(id);
    }
}
