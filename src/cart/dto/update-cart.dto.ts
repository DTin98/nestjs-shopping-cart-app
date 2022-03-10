import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CartItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  quantity: number;
}

export class UpdateCartDto {
  @IsNotEmpty()
  @ApiProperty({ type: [CartItem] })
  cartItems: CartItem[];
}
