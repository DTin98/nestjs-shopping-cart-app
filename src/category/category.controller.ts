import { Controller } from "@nestjs/common";
import { ProductService } from "./category.service";

@Controller('categories')
export class CategoryController {
    constructor(private readonly userService: ProductService) { }
}
