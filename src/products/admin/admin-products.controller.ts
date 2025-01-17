import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminProductsService } from './admin-products.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly adminProductsService: AdminProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.adminProductsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.adminProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminProductsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.adminProductsService.update(id, updateProductDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminProductsService.remove(id);
  }
}
