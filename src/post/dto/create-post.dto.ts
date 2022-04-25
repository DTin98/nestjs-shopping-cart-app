import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  image: string;
}
