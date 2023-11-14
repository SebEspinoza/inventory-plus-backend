import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { LogProductService } from "./logProduct.service";
import { LogProductMorning } from "../schemas/logProductMorning.schema";

@Controller("logProductsMorning")
export class LogProductController {
    constructor(private readonly logProductService: LogProductService) { }

    @Post('/morning')
    async createMorning() {
        return this.logProductService.scheduleMorningLogProduct();
    }

    @Get()
    async findAll(): Promise<LogProductMorning[]> {
        return this.logProductService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<LogProductMorning> {
        return this.logProductService.findOne(id);
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() logProduct: LogProductMorning,
    ): Promise<LogProductMorning> {
        return this.logProductService.update(id, logProduct);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<LogProductMorning> {
        return this.logProductService.remove(id);
    }
}