import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BannerImgs {
  smallImg: string;
  largeImg: string;
}

export class UpdateHomeConfigDto {
  @IsOptional()
  @ApiProperty({ type: BannerImgs })
  @Type(() => BannerImgs)
  bannerImgs?: BannerImgs[];

  @IsOptional()
  @ApiProperty()
  coverImg?: string;
}
