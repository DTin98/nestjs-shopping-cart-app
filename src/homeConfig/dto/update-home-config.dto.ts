import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHomeConfigDto {
  @IsNotEmpty()
  @ApiProperty()
  bannerUrls: string[];
}
