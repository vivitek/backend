import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ServiceCreationInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  bandwidth: number;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  ips: string[];

  @Field(() => String)
  router: string;

  @Field(() => Boolean, { nullable: true })
  banned?: boolean;
}

@InputType()
export class ServiceUpdateInput {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  bandwidth: number;

  @Field(() => Boolean, { nullable: true })
  banned?: boolean;
}
