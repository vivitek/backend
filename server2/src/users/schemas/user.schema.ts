import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import {Document} from 'mongoose'

@Schema()
export class User extends Document {
	@Prop({unique:true, required:true})
	email: string
	@Prop({required:true})
	password: string
	@Prop({required:true, unique:true})
	username: string
}

export const UserSchema = SchemaFactory.createForClass(User)