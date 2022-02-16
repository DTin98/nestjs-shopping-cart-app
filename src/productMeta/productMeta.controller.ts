import { Body, Controller, Get, Patch } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import * as _ from 'lodash';
import { ProductMetaService } from './productMeta.service';

@Controller('product-meta')
export class ProductMetaController {
    constructor(private readonly productService: ProductMetaService) { }

}
