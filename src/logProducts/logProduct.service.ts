import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { LogProductMorning, LogProductMorningDocument } from '../schemas/logProductMorning.schema';
import { ProductService } from 'src/products/product.service';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class LogProductService {
  constructor(
    @InjectModel(LogProductMorning.name)
    private logProductModel: Model<LogProductMorningDocument>,
    private productService: ProductService,
  ) { }

  @Cron('0 9 * * *', {
    timeZone: 'America/Santiago', // 9:00AM UTC-4
  })
  async create(): Promise<LogProductMorning> {
    try {
      const products = await this.productService.findAll();

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


  async findAll(): Promise<LogProductMorning[]> {
    return this.logProductModel
      .find()
      .populate({
        path: 'products',
        select: '-img',
      })
      .exec();
  }

  async findOne(id: string): Promise<LogProductMorning> {
    return this.logProductModel
      .findById(id)
      .populate({
        path: 'products',
        select: '-img',
      })
      .exec();
  }

  async update(id: string, logProduct: LogProductMorning): Promise<LogProductMorning> {
    return this.logProductModel.findByIdAndUpdate(id, logProduct, {
      new: true,
    });
  }

  async remove(id: string): Promise<LogProductMorning> {
    return this.logProductModel.findByIdAndRemove(id);
  }
}
