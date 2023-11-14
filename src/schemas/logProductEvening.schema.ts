import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Product } from "./product.schema";

export type LogProductEveningDocument = LogProductEvening & Document;

@Schema()
export class LogProductEvening {
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
    products: Product[];

    @Prop({ type: Date, default: Date.now })
    timestamp: Date;

}

export const LogProductEveningSchema = SchemaFactory.createForClass(LogProductEvening);
