import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tag } from '../../tag/schemas/tag.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Router } from '../../router/schemas/router.schema';

@ObjectType()
@Schema()
export class Service extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  bandwidth: number;

  @Field(() => [Tag])
  @Prop({ type: Types.ObjectId, ref: Tag.name })
  tags: Types.ObjectId[];

  @Field(() => [String])
  @Prop({ default: [] })
  ips: string[];

  @Field(() => Router)
  @Prop({ type: Types.ObjectId, ref: Router.name })
  router: Types.ObjectId;

  @Field(() => Boolean)
  @Prop({ type: Boolean, default: false })
  banned: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
