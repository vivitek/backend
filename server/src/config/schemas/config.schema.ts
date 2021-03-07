import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Service } from '../../service/schemas/service.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/schemas/users.schema';

@ObjectType()
@Schema()
export class Config extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => Boolean)
  @Prop({ default: false, type: Boolean })
  public: boolean;

  @Field(() => User)
  @Prop({ type: Types.ObjectId, ref: User.name })
  creator: Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;
  @Field(() => [Service])
  @Prop({ type: Types.ObjectId, ref: Service.name, default: [] })
  services: Types.ObjectId[];

  @Field(() => [Config])
  @Prop({ type: Types.ObjectId, ref: Config.name, default: [] })
  configs: Types.ObjectId[];
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
