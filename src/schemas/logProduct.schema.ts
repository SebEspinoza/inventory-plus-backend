import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";
import { Product } from "./product.schema";

export type LogProductDocument = LogProduct & Document;

@Schema()
export class LogProduct {
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }] })
    products: Product[]; // Un array de productos que se registraron en este log

    @Prop({ type: Date, default: Date.now })
    date_of_expiry: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: User;
}

export const LogProductSchema = SchemaFactory.createForClass(LogProduct);
