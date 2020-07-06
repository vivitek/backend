import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose'

@Schema()
export class Tag extends Document {
	@Prop()
	name: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)