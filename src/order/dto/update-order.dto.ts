import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { STATUS } from '../enums/status.enum';

export class UpdateOrderCartDto {
  @ApiProperty({ enum: STATUS })
  @IsEnum(STATUS)
  status: STATUS
}
