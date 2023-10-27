import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { LogProductService } from "./logProduct.service";
import { LogProduct } from "../schemas/logProduct.schema";

@Controller("logProducts")
export class LogProductController {
    constructor(private readonly logProductService: LogProductService) { }

    @Post()
    async createMorning() {
        return this.logProductService.scheduleMorningLogProduct();
    }

    @Post()
    async createEvening() {
        return this.logProductService.scheduleEveneningLogProduct();
    }

    @Get()
    async findAll(): Promise<LogProduct[]> {
        return this.logProductService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<LogProduct> {
        return this.logProductService.findOne(id);
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() logProduct: LogProduct,
    ): Promise<LogProduct> {
        return this.logProductService.update(id, logProduct);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<LogProduct> {
        return this.logProductService.remove(id);
    }
}