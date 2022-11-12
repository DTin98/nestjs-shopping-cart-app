import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { HomeConfigService } from './home-config.service';
import { CreateHomeConfig } from './dto/create-home-config.dto';
import { UpdateHomeConfigDto } from './dto/update-home-config.dto';
import { IHomeConfig } from './interfaces/home-config.interface';
import { ROLE } from 'src/user/enums/role.enum';
import { Roles } from 'src/shared/decorators/role.decorator';

@Controller('homeConfig')
@ApiTags('homeConfig')
export class HomeConfigController {
  constructor(private readonly bannerUrlService: HomeConfigService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Public()
  async findAll(): Promise<IHomeConfig> {
    return await this.bannerUrlService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async findOne(@Param('id') id: string): Promise<IHomeConfig> {
    return await this.bannerUrlService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @Roles(ROLE.admin)
  async create(
    @Body(new ValidationPipe()) createPostDto: CreateHomeConfig,
  ): Promise<IHomeConfig> {
    return await this.bannerUrlService.create(createPostDto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  @Roles(ROLE.admin)
  async update(
    @Body(new ValidationPipe()) updatePostDto: UpdateHomeConfigDto,
  ): Promise<IHomeConfig> {
    return await this.bannerUrlService.findOneAndUpdate(updatePostDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Public()
  async delete(@Param('id') id: string): Promise<IHomeConfig> {
    return await this.bannerUrlService.findOneAndDelete(id);
  }
}
