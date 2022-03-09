import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/shared/decorators/public.decorator";
import { User } from "src/shared/decorators/user.decorator";
import { IUser } from "src/user/interfaces/user.interface";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { ICart } from "./interfaces/cart.interface";

@Controller('cart')
@ApiTags('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get('/')
    async getOne(@User() user: IUser): Promise<ICart> {
        return this.cartService.getUserCart(user._id);
    }

    @Post('/add-product/:productId')
    @HttpCode(HttpStatus.OK)
    async createCart(@User() user: IUser, @Param('productId') productId: string, @Body(new ValidationPipe()) createCartDto: CreateCartDto): Promise<ICart> {
        return this.cartService.createCartUser(user._id, productId, createCartDto);
    }

    @Patch('/')
    async updateCart(@User() user: IUser, @Body(new ValidationPipe()) updateCartDto: UpdateCartDto): Promise<ICart> {
        try {
            const cart = await this.cartService.findOneByUser(user._id);
            return this.cartService.update(cart._id, updateCartDto);
        }
        catch (e) {
            throw new BadRequestException(e.message);
        }
    }


    @Delete('/:id')
    @Public()
    async delete(@Param('id') id: string): Promise<{ ok?: number, n?: number }> {
        return this.cartService.delete(id);
    }
}
