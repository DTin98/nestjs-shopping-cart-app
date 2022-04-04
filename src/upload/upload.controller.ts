import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { CartService } from 'src/cart/cart.service';
import { Roles } from 'src/shared/decorators/role.decorator';
import { ROLE } from 'src/user/enums/role.enum';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/images',
      filename: (req, file, cb) => {
        const fileName: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;

        cb(null, `${fileName}${extension}`);

      }

    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {

  }
}
