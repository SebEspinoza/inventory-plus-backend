import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({})
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    email: string;

    @Prop({})
    first_name: string;

    @Prop({})
    last_name: string;

    @Prop({
        type: [
            {
                role: { type: Boolean, required: true },
            },
        ],
        default: [],
    })
    role: {
        role: string;
    }[];

    @Prop({})
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);