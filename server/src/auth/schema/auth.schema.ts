import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/schemas/users.schema';

@ObjectType()
export class AuthDetails {
  @Field()
  access_token: string;

  @Field()
  user: User;
}
