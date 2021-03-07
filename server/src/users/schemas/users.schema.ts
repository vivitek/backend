import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class User extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop({ unique: true, required: true, type: String })
  email: string;

  @Field(() => String)
  @Prop({ required: true, type: String })
  password: string;

  @Field(() => String)
  @Prop({ required: true, unique: true, type: String })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
