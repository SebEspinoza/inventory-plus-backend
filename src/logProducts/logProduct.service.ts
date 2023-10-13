import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cron } from "@nestjs/schedule";
import { LogProduct, LogProductDocument } from "../schemas/logProduct.schema";
import { ProductService } from "src/products/product.service";
import { Product, ProductDocument } from "src/schemas/product.schema";


@Injectable()
export class LogProductService {
    constructor(@InjectModel(LogProduct.name) private logProductModel: Model<LogProductDocument>,
        private productService: ProductService,
    ) { }

    @Cron('0 9 * * *') // 9:00AM
    async scheduleMorningLogProduct() {
        const products = await this.productService.findAll();
        await this.createLogProduct(products);
    }

    @Cron('00 20 * * *') // 8:00PM
    async scheduleEveneningLogProduct() {
        const products = await this.productService.findAll();
        await this.createLogProduct(products);
    }


    private async createLogProduct(products: Product[]) {
        const logProduct = new this.logProductModel({
            products,
            timestamp: new Date()
        }).populate('products');
        return (await logProduct).save();
    }

    async create(logProduct: LogProduct): Promise<LogProduct> {
        const createdLogProduct = new this.logProductModel(logProduct);
        return createdLogProduct.save();
    }

    async findAll(): Promise<LogProduct[]> {
        return this.logProductModel.find().populate('products');
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