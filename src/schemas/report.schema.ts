import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { User } from "./user.schema";

export type ReportDocument = Report & Document;

@Schema()
export class Report {
    @Prop({ required: true })
    date: Date;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    user: User;
}

export const ReportSchema = SchemaFactory.createForClass(Report);