import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Product } from "./product.schema";

export type LogProductMorningDocument = LogProductMorning & Document;

@Schema()
export class LogProductMorning {
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];

    @Prop({ type: Date, default: Date.now })
    timestamp: Date;

}

export const LogProductMorningSchema = SchemaFactory.createForClass(LogProductMorning);
