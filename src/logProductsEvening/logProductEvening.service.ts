import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { ProductService } from 'src/products/product.service';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { LogProductEvening, LogProductEveningDocument } from 'src/schemas/logProductEvening.schema';
import * as _ from 'lodash';

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
    async create(): Promise<LogProductEvening> {
        try {
            const products = await this.productService.findAll();

            // Extract only the relevant fields (name, quantity, price) from each product
            const simplifiedProducts = products.map(product => ({
                name: product.name,
                quantity: product.quantity,
                price: product.price,
            }));

            const logProduct = new this.logProductModel({
                products: simplifiedProducts,
                timestamp: new Date(),
            });

            const createdLogProduct = await logProduct.save();
            console.log('Log product created:', createdLogProduct);
            return createdLogProduct;
        } catch (error) {
            console.error('Error creating log product:', error);
            throw error;
        }
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
