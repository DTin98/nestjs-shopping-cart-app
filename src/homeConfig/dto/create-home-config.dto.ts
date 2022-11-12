import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeConfig {
  @IsNotEmpty()
  @ApiProperty()
  bannerUrls: string[];
}
