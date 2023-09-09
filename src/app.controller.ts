import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.appService.create(product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.appService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<Product> {
    return this.appService.update(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return this.appService.remove(id);
  }

}
