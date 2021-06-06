import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { PubSub } from 'graphql-subscriptions';
import { UserCreationInput, UserUpdateInput } from './schemas/users.input';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';
import { RouterService } from '../router/router.service';

@Resolver(() => User)
@UseGuards(new AuthGuard())
export class UsersResolver {
  private pubSub: PubSub;
  private logger: Logger;

  constructor(private userService: UsersService, private routerService: RouterService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('UserResolver');
  }

  @Query(() => [User])
  async getUsers(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('userCreationData') userCreationData: UserCreationInput,
  ): Promise<User> {
    const user = await this.userService.createUser(userCreationData);
    this.logger.log(`created user id ${user._id}`);
    this.pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('userUpdateData') userUpdateData: UserUpdateInput): Promise<User> {
    const user = await this.userService.updateById(userUpdateData);
    this.logger.log(`updated user with id ${user._id}`);
    this.pubSub.publish('userUpdated', { userUpdated: user });
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<User> {
    const user = await this.userService.deleteById(id);
    this.logger.log(`removed user with id ${id}`);
    this.pubSub.publish('userDeleted', { userDeleted: user });
    return user;
  }

  @Subscription(() => User)
  async userCreated(): Promise<AsyncIterator<User>> {
    return this.pubSub.asyncIterator('userCreated');
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Query(() => User)
  async me(@Context('user') user: User) {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...other } = user;
    return other;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @ResolveField()
  async boxes(@Parent() user: User) {
    return user.boxes.map(async e => {
      return await this.routerService.findById(e.toString())
    })
  }
}
