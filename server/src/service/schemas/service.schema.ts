import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tag } from '../../tag/schemas/tag.schema';
import { Ip } from '../../ip/schemas/ip.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Router } from 'src/router/schemas/router.schema';

@ObjectType()
@Schema()
export class Service extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  displayName: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  bandwidth: number;

  @Field(() => [Tag])
  @Prop({ type: Types.ObjectId, ref: Tag.name })
  tags: [Types.ObjectId];

  @Field(() => [String])
  @Prop({ type: Types.ObjectId, ref: Ip.name })
  ips: [string];

  @Field(() => Router)
  @Prop({ type: Types.ObjectId, ref: Router.name })
  router: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
