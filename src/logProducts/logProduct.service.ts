import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { LogProduct, LogProductDocument } from "../schemas/logProduct.schema";

@Injectable()
export class LogProductService {
    constructor(@InjectModel(LogProduct.name) private logProductModel: Model<LogProductDocument>) { }

    async create(logProduct: LogProduct): Promise<LogProduct> {
        const createdLogProduct = new this.logProductModel(logProduct);
        return createdLogProduct.save();
    }

    async findAll(): Promise<LogProduct[]> {
        return this.logProductModel.find().exec();
    }

    async findOne(id: string): Promise<LogProduct> {
        return this.logProductModel.findById(id);
    }

    async update(id: string, logProduct: LogProduct): Promise<LogProduct> {
        return this.logProductModel.findByIdAndUpdate(id, logProduct, { new: true });
    }

    async remove(id: string): Promise<LogProduct> {
        return this.logProductModel.findByIdAndRemove(id);
    }
}