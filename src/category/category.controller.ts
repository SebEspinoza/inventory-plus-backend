import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/schemas/category.schema';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':category')
    async findOne(@Param('category') category: String): Promise<Category> {
        return this.categoryService.findOne(category);
    }
}