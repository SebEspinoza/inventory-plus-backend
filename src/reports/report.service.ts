import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Report, ReportDocument } from "../schemas/report.schema";

@Injectable()
export class ReportService {
    constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) { }

    async create(report: Report): Promise<Report> {
        const createdReport = new this.reportModel(report);
        return createdReport.save();
    }

    async findAll(): Promise<Report[]> {
        return this.reportModel.find().exec();
    }

    async findOne(id: string): Promise<Report> {
        return this.reportModel.findById(id);
    }

    async update(id: string, report: Report): Promise<Report> {
        return this.reportModel.findByIdAndUpdate(id, report, { new: true });
    }

    async remove(id: string): Promise<Report> {
        return this.reportModel.findByIdAndRemove(id);
    }
}