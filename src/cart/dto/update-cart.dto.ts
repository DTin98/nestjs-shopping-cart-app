import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CartItem {
  @ApiProperty()
  cartItemId: string;

  @ApiProperty()
  quantity: number;
}

export class UpdateCartDto {
  @IsNotEmpty()
  @ApiProperty({ type: [CartItem] })
  cartItems: CartItem[];
}
