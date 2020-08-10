import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

@Schema()
export class Router extends Document {
    @Prop()
    name: string

    @Prop()
    url: string
}

export const RouterSchema = SchemaFactory.createForClass(Router)