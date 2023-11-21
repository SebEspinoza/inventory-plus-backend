import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop({ required: true })
    role: Boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);