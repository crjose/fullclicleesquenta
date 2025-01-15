import { Injectable } from '@nestjs/common';
//import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaService } from '../../prisma/prisma.service';
//import { NotFoundError } from 'src/common/errors';
import { NotFoundError } from '../../common/errors';

@Injectable()
export class ProductsService {
  
  constructor(private prismaService: PrismaService) {}

  findAll(dto: { name?: string; page?: number; limit?: number }) {
    console.log(dto)
    const { name, page = 1, limit = 15 } = dto;
    return this.prismaService.product.findMany({
      ...(name && {
        where: {
          name: {
            contains: name,
          },
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(slug: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug,
      },
    });

    if (!product) {
      throw new NotFoundError('Product', slug, 'slug');
    }

    return product;
  }
}
