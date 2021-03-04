import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { PubSub } from 'graphql-subscriptions';
import { UserCreationInput, UserUpdateInput } from './schemas/users.input';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Resolver()
@UseGuards(new AuthGuard())
export class UsersResolver {
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

  @Mutation(() => User)
  async updateUser(@Args('userUpdateData') userUpdateData: UserUpdateInput) {
    const user = await this.userService.updateById(userUpdateData);
    this.logger.log(`updated user with id ${user._id}`);
    this.pubSub.publish('userUpdated', { userUpdated: user });
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    const user = await this.userService.deleteById(id);
    this.logger.log(`removed user with id ${id}`);
    this.pubSub.publish('userDeleted', { userDeleted: user });
    return user;
  }

  @Subscription(() => User)
  async userCreated() {
    return this.pubSub.asyncIterator('userCreated');
  }

  @Query(() => User)
  async me(@Context('user') user: User) {
    const { password, ...other } = user;
    return other;
  }
}
