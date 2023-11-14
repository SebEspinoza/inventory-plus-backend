import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { LogProductService } from "./logProductEvening.service";
import { LogProductEvening } from "../schemas/logProductEvening.schema";

@Controller("logProductsEvening")
export class LogProductController {
    constructor(private readonly logProductService: LogProductService) { }

    @Post('/evening')
    async createEvening() {
        return this.logProductService.scheduleEveningLogProduct();
    }

    @Get()
    async findAll(): Promise<LogProductEvening[]> {
        return this.logProductService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<LogProductEvening> {
        return this.logProductService.findOne(id);
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() logProduct: LogProductEvening,
    ): Promise<LogProductEvening> {
        return this.logProductService.update(id, logProduct);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<LogProductEvening> {
        return this.logProductService.remove(id);
    }
}