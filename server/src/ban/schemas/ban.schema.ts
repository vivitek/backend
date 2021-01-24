import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Router } from '../../router/schemas/router.schema';

@ObjectType()
@Schema()
export class Ban extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  address: string;

  @Field(() => Boolean)
  @Prop()
  banned: boolean;

  @Field(() => Router)
  @Prop({ type: Types.ObjectId, ref: Router.name })
  routerSet: Types.ObjectId;
}

export const BanSchema = SchemaFactory.createForClass(Ban);
