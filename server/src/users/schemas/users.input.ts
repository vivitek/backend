import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class UserCreationInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field(() => [String], {defaultValue: []})
  boxes?: Types.ObjectId[]
}

@InputType()
export class UserUpdateInput {
  @Field()
  _id: string;
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => [String], { nullable: true })
  boxes?: Types.ObjectId[]
}
