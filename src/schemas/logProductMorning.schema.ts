import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema'; // Adjust the import as needed

@Schema()
export class LogProductMorning {
    @Prop({
        type: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        default: [],
    })
    products: {
        name: string;
        quantity: number;
        price: number;
    }[];

    @Prop({ type: Date, default: Date.now })
    timestamp: Date;
}

export type LogProductMorningDocument = LogProductMorning & Document;

export const LogProductMorningSchema = SchemaFactory.createForClass(LogProductMorning);