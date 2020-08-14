import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import { User } from "../../users/schemas/user.schema";
import { Ban } from "../../ban/schemas/ban.schema";
import { Service } from "../../service/schemas/service.schema";

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