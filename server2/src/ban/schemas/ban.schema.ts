import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose'

@Schema()
export class Ban extends Document {
	@Prop()
	address: string

	@Prop()
	banned: boolean

	@Prop()
	routerSet: string
}

export const BanSchema = SchemaFactory.createForClass(Ban)