import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from "./product.service";
import { Product } from "../schemas/product.schema";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() product: Product,
    ): Promise<Product> {
        return this.productService.update(id, product);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Product> {
        return this.productService.remove(id);
    }
}
