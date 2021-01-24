import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Resolver()
export class UserResolver {
  private pubSub: PubSub;
  private logger: Logger;

  constructor(private userService: UsersService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('UserResolver');
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.getAll();
  }
}
