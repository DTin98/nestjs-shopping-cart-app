import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationController } from './configuration.controller';
import { PassportModule } from '@nestjs/passport';
import {
  CONFIGURATION,
  configurationSchema,
} from './schemas/configuration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CONFIGURATION, schema: configurationSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
