import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule { }
