import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from "../schemas/user.schema";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    async create(@Body() user: User): Promise<User> {
        return this.userService.create(user);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() user: User,
    ): Promise<User> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> {
        return this.userService.remove(id);
    }

}