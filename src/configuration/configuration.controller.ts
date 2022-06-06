import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Public } from 'src/shared/decorators/public.decorator';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ROLE } from 'src/user/enums/role.enum';
import { UpdateConfigurationDto } from './dto/create-configuration.dto';
import { IConfiguration } from './interfaces/configuration.interface';
import { CONFIGURATION } from './schemas/configuration.schema';

@ApiTags('configuration')
@Controller('configurations')
export class ConfigurationController {
  @InjectModel(CONFIGURATION)
  private readonly configurationModel: Model<IConfiguration>;

  @Get('/')
  @Public()
  async getAll() {
    const config = await this.configurationModel.find();
    return config[0];
  }
  @Patch('/')
  @Roles(ROLE.admin)
  async update(@Body() updateConfigurationDto: UpdateConfigurationDto) {
    const config: IConfiguration[] = await this.configurationModel.find();
    if (config[0]?._id) {
      await this.configurationModel.updateOne(
          {_id: config[0]._id},
          updateConfigurationDto,
      );
      return await this.getAll();
    } else {
      const newConfig = new this.configurationModel(updateConfigurationDto);
      return await newConfig.save();
    }
  }
}
