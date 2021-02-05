import { Logger } from '@nestjs/common';
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
import { BanService } from './ban.service';
import { BanCreation, BanUpdate } from './schemas/ban.inputs';
import { Ban } from './schemas/ban.schema';

@Resolver(() => Ban)
export class BanResolver {
  private pubSub: PubSub;
  private readonly logger;

  constructor(private banService: BanService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('BanResolver');
  }

  @Query(() => [Ban])
  async getBans(@Args('id', { type: () => String }) id: string) {
    const bans = await this.banService.findByRouter(id);
    this.logger.log(`Getting bans for router id ${id}`);
    return bans;
  }

  @Mutation(() => Ban)
  async createBan(@Args('banCreationData') banCreationData: BanCreation) {
    const ban = await this.banService.create(banCreationData);
    this.logger.log(`Created ban with id ${ban._id}`);
    this.pubSub.publish('banCreated', { banCreated: ban });
    return ban;
  }

  @Mutation(() => Ban)
  async updateBan(@Args('banUpdateData') banUpdateData: BanUpdate) {
    const ban = await this.banService.updateById(
      banUpdateData._id,
      banUpdateData,
    );
    this.logger.log(`Updated ban with id ${ban._id}`);
    this.pubSub.publish('banUpdated', { banUpdated: ban });
    return ban;
  }

  @Mutation(() => Ban)
  async deleteBan(@Args('id') id: string) {
    const ban = await this.banService.deleteById(id);
    this.logger.log(`Removed ban with id ${id}`);
    this.pubSub.publish('banDeleted', { banDeleted: ban });
    return ban;
  }
  @Subscription(() => Ban, {
    filter: (payload, variables) => {
      /* istanbul ignore next */
      return payload.banCreated.routerSet === variables.routerSet;
    },
  })
  async banCreated(@Args('routerSet') routerSet: string) {
    return this.pubSub.asyncIterator('banCreated');
  }
  @Subscription(() => Ban, {
    filter: (payload, variables) => {
      /* istanbul ignore next */
      return payload.banUpdated.routerSet === variables.routerSet;
    },
  })
  async banUpdated(@Args('routerSet') routerSet: string) {
    return this.pubSub.asyncIterator('banUpdated');
  }

  @ResolveField()
  async routerSet(@Parent() ban: Ban, @Args('populate') populate: boolean) {
    /* istanbul ignore next */
    if (populate) await ban.populate('routerSet').execPopulate();
    return ban.routerSet;
  }
}
