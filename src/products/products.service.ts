import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'src/common/errors';

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

  /* findOne(id: string) {
    return this.prismaService.product.findFirst({
      where: {
        id,
      },
    });
  }  */
  async findOne(id: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundError('Product', id);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    let product = await this.prismaService.product.findFirst({
      where: {
        slug: updateProductDto.slug,
      },
    });

    if(product && product.id !== id){
      throw new ProductSlugAlreadyExistsError(updateProductDto.slug);
    }

    product = product && product.id === id ? product : await this.prismaService.product.findFirst({

      where:{
        id ,
      },
      
    });


    if (!product) {
      throw new NotFoundError('Product', id); 
    }


    return this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

    /* const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });

   */

  async remove(id: string) {

    const product = await this.prismaService.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundError('Product', id);
    }


    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
