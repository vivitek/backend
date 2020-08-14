import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import { User } from "src/users/schemas/user.schema";
import { Ban } from "src/ban/schemas/ban.schema";
import { Service } from "src/service/schemas/service.schema";

@Schema()
export class Template extends Document {
    @Prop()
    name: string

    @Prop()
    author: User

    @Prop()
    hosts: Array<{
        banRef: Ban,
        banned: boolean
    }>

    @Prop()
    services: Array<{
        serviceRef: Service,
        banned: boolean
    }>
}

export const TemplateSchema = SchemaFactory.createForClass(Template)