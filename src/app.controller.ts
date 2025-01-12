import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('esquenta')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  xpto() {
    return 'post';
  }
}
