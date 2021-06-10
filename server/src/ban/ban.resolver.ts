import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from '../auth/auth.guard';
import { BanService } from './ban.service';
import { BanCreation, BanUpdate } from './schemas/ban.inputs';
import { Ban } from './schemas/ban.schema';

@Resolver(() => Ban)
@UseGuards(new AuthGuard())
export class BanResolver {
  private pubSub: PubSub;
  private readonly logger;

  constructor(private banService: BanService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('BanResolver');
  }

  @Query(() => [Ban])
  async getBans(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Ban[]> {
    const bans = await this.banService.findByRouter(id);
    this.logger.log(`Getting bans for router id ${id}`);
    return bans;
  }

  @Mutation(() => Ban)
  async createBan(
    @Args('banCreationData') banCreationData: BanCreation,
  ): Promise<Ban> {
    const ban = await this.banService.create(banCreationData);
    this.logger.log(`Created ban with id ${ban._id}`);
    this.pubSub.publish('banCreated', { banCreated: ban });
    return ban;
  }

  @Mutation(() => Ban)
  async updateBan(
    @Args('banUpdateData') banUpdateData: BanUpdate,
  ): Promise<Ban> {
    const ban = await this.banService.updateById(
      banUpdateData._id,
      banUpdateData,
    );
    this.logger.log(`Updated ban with id ${ban._id}`);
    this.pubSub.publish('banUpdated', { banUpdated: ban });
    return ban;
  }

  @Mutation(() => Ban)
  async deleteBan(@Args('id') id: string): Promise<Ban> {
    const ban = await this.banService.deleteById(id);
    this.logger.log(`Removed ban with id ${id}`);
    this.pubSub.publish('banDeleted', { banDeleted: ban });
    return ban;
  }

  @Mutation(() => Boolean)
  async deleteByRouter(@Args('routerId') routerId: string): Promise<boolean> {
    return await this.banService.deleteByRouter(routerId);
  }

  @Subscription(() => Ban, {
    filter: (payload, variables) => {
      return payload.banCreated.routerSet === variables.routerSet;
    },
  })
  async banCreated(
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('routerSet') routerSet: string,
  ): Promise<AsyncIterator<Ban>> {
    return this.pubSub.asyncIterator('banCreated');
  }

  @Subscription(() => Ban, {
    filter: (payload, variables) => {
      return payload.banUpdated.routerSet === variables.routerSet;
    },
  })
  async banUpdated(
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('routerSet') routerSet: string,
  ): Promise<AsyncIterator<Ban>> {
    return this.pubSub.asyncIterator('banUpdated');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @ResolveField()
  async routerSet(@Parent() ban: Ban, @Args('populate') populate: boolean) {
    if (populate) await ban.populate('routerSet').execPopulate();
    return ban.routerSet;
  }
}
