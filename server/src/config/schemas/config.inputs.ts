import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class ConfigCreationInput {
  @Field(() => String)
  name: string;

  @Field(() => [String], { nullable: true })
  services?: [string];

  @Field(() => [String], { nullable: true })
  configs?: [string];

  @Field(() => Boolean, { nullable: true })
  public?: boolean;

  @Field(() => String)
  creator: Types.ObjectId;
}

@InputType()
export class ConfigUpdateInput {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name?: string;

  @Field(() => [String])
  services?: [Types.ObjectId];

  @Field(() => [String])
  configs?: [Types.ObjectId];

  @Field(() => Boolean)
  public?: boolean;
}
