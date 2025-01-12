import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ProductSlugAlreadyExistsErrorFilter } from './products/filters/product-slug-already-exists.filters';
import { ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './products/dto/create-product.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ProductSlugAlreadyExistsErrorFilter());

  /* app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  ); */

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
