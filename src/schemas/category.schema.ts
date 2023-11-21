import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";


export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({ required: true })
    category: String;
}

export const CategorySchema = SchemaFactory.createForClass(Category);