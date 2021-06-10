import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagCreationInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class TagUpdateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  _id: string;
}
