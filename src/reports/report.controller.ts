import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ReportService } from "./report.service";
import { Report } from "../schemas/report.schema";

@Controller('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post()
    async create(@Body() report: Report): Promise<Report> {
        return this.reportService.create(report);
    }

    @Get()
    async findAll(): Promise<Report[]> {
        return this.reportService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Report> {
        return this.reportService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() report: Report,
    ): Promise<Report> {
        return this.reportService.update(id, report);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Report> {
        return this.reportService.remove(id);
    }
}
