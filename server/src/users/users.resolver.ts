import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UserCreationInput } from './schemas/users.input';
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
    return this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('userCreationData') userCreationData: UserCreationInput,
  ) {
    const user = await this.userService.createUser(userCreationData);
    this.logger.log(`created user id ${user._id}`);
    this.pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Subscription(() => User)
  async userCreated() {
    return this.pubSub.asyncIterator('userCreated');
  }
}
