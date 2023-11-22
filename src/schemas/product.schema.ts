import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({
        type: [
            {
                category: { type: String, required: true },
            }
        ],
        default: [],
    })
    category: {
        category: string;
    }[];

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ type: Date, default: Date.now })
    date_of_expiry: Date;

    @Prop()
    img: string;

    @Prop({ type: Date, default: Date.now })
    date_added: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);