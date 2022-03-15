import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderCartDto {
  city: string;
  addressLine1: string;
  addressLine2: string;
}
