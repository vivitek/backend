import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BanCreation {
  @Field(() => String)
  address: string;
  @Field(() => Boolean)
  banned: boolean;
  @Field(() => String)
  routerSet: string;
}

@InputType()
export class BanUpdate {
  @Field(() => String)
  _id: string;
  @Field(() => Boolean)
  banned: boolean;
}
