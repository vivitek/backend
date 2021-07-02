import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field(() => String, {nullable: true})
  email?: string;

  @Field(() => String, {nullable: true})
  username?: string;

  @Field()
  password: string;
}
