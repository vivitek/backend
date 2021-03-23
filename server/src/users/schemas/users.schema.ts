import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Router } from '../../router/schemas/router.schema';
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

  @Field(() => [Router])
  @Prop({default: [], nullable: true, type: Types.ObjectId, ref: Router.name})
  boxes: Types.ObjectId[]

  @Field(() => Boolean)
  @Prop({ required: false, default: false, type: Boolean })
  otp_enabled: boolean;

  @Field(() => String)
  @Prop({ required: false, type: String })
  otp_secret: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
