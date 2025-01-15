import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ProductSlugAlreadyExistsErrorFilter } from './products/filters/product-slug-already-exists.filters';
//import { ValidationPipe } from '@nestjs/common';
//import { CreateProductDto } from './products/admin/dto/create-product.dto';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { InvalidCredentialsErrorFilter } from './auth/filters/invalid-credentials.error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ProductSlugAlreadyExistsErrorFilter(),
    new NotFoundErrorFilter(),
    new InvalidCredentialsErrorFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
