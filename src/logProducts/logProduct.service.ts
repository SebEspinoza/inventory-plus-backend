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
  async scheduleMorningLogProduct() {
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

  async create(logProduct: LogProductMorning): Promise<LogProductMorning> {
    const createdLogProduct = new this.logProductModel(logProduct);
    return createdLogProduct.save();
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
