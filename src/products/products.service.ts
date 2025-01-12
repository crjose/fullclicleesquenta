
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { ProductSlugAlreadyExistsError } from './errors';


@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  //verificando se o slug do produto já existe
  async create(createProductDto: CreateProductDto) {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug: createProductDto.slug,
      },
    });

    if (product) {
      throw new ProductSlugAlreadyExistsError(createProductDto.slug);
    }

    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

   
  
  findOne(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id,
      },
    });
  } 
  /* async findOne(id: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });
  }

  if(!product){
    throw new NotFoundError( 'Product', id );
  }

    return product; */

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
