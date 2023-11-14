import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { ProductService } from 'src/products/product.service';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { LogProductEvening, LogProductEveningDocument } from 'src/schemas/logProductEvening.schema';

@Injectable()
export class LogProductService {
    constructor(
        @InjectModel(LogProductEvening.name)
        private logProductModel: Model<LogProductEveningDocument>,
        private productService: ProductService,
    ) { }

    @Cron('0 20 * * *', {
        timeZone: 'America/Santiago', // 9:00AM UTC-4
    })
    async scheduleEveningLogProduct() {
        const products = await this.productService.findAll();
        await this.createLogProduct(products);
    }

    private async createLogProduct(products: Product[]) {
        const logProduct = new this.logProductModel({
            products,
            timestamp: new Date(),
        });
        return await this.create(logProduct);
    }

    async create(logProduct: LogProductEvening): Promise<LogProductEvening> {
        const createdLogProduct = new this.logProductModel(logProduct);
        return createdLogProduct.save();
    }

    async findAll(): Promise<LogProductEvening[]> {
        return this.logProductModel
            .find()
            .populate({
                path: 'products',
                select: '-img',
            })
            .exec();
    }

    async findOne(id: string): Promise<LogProductEvening> {
        return this.logProductModel
            .findById(id)
            .populate({
                path: 'products',
                select: '-img',
            })
            .exec();
    }

    async update(id: string, logProduct: LogProductEvening): Promise<LogProductEvening> {
        return this.logProductModel.findByIdAndUpdate(id, logProduct, {
            new: true,
        });
    }

    async remove(id: string): Promise<LogProductEvening> {
        return this.logProductModel.findByIdAndRemove(id);
    }
}
