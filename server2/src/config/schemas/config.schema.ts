import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import { Service } from "src/service/schemas/service.schema";

@Schema()
export class Config extends Document {
    @Prop()
    name: string;

    @Prop()
    services: Array<Service>
}

export const ConfigSchema = SchemaFactory.createForClass(Config)