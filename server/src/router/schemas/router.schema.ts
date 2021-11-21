import { Field, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Router extends Document {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop({ unique: true, type: String })
  url: string;

  @Field(() => String)
  @Prop({ unique: true, type: String})
  certificat: string;
}

@ObjectType()
export class RouterCreated {

  @Field()
  router: Router

  @Field(() => String)
  access_token: string
}

export const RouterSchema = SchemaFactory.createForClass(Router);
