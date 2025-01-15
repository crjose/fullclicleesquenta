import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductQueryDto } from './dto/products-query.dto';
import { ProductsService } from '../public/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(@Query() queryDto: ProductQueryDto) {
    return this.productService.findAll(queryDto)
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    // Use the slug parameter
    return this.productService.findOne(slug);
  }
}
