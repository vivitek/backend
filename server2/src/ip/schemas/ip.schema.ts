import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

@Schema()
export class Ip extends Document {
    @Prop()
    v4ip: string;

    @Prop()
    v6ip: string;
}

export const IpSchema = SchemaFactory.createForClass(Ip)