import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "./user.schema";

export type LogProductDocument = LogProduct & Document;

@Schema()
export class LogProduct {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ type: Date, default: Date.now })
    date_of_expiry: Date;

    @Prop()
    img: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: User;
}

export const LogProductSchema = SchemaFactory.createForClass(LogProduct);
