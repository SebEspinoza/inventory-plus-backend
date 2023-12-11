import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from './product.schema'; // Adjust the import as needed

@Schema()
export class LogProductEvening {
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

export type LogProductEveningDocument = LogProductEvening & Document;

export const LogProductEveningSchema = SchemaFactory.createForClass(LogProductEvening);
