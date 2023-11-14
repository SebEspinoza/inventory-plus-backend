import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../schemas/product.schema";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) { }

    async create(product: Product): Promise<Product> {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find();
    }

    async findOne(id: string): Promise<Product> {
        return this.productModel.findById(id);
    }

    async update(id: string, product: Product): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, product, { new: true });
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id);
    }
}