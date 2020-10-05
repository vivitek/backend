import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import { Tag } from "../../tag/schemas/tag.schema";
import { Ip } from "../../ip/schemas/ip.schema";

@Schema()
export class Service extends Document {
    @Prop()
    displayName: string

    @Prop()
    name: string

    @Prop()
    bandwidth:  number

    @Prop()
    tags: Array<Tag>

    @Prop()
    ips: Array<Ip>
}

export const ServiceSchema = SchemaFactory.createForClass(Service)