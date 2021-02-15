import { Logger } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { RouterService } from './router.service';

import {
  RouterCreationInput,
  RouterUpdateInput,
} from './schemas/router.inputs';
import { Router } from './schemas/router.schema';

@Resolver(() => Router)
export class RouterResolver {
  private pubSub: PubSub;
  private readonly logger;
  constructor(private routerService: RouterService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('RouterResolver');
  }

  @Query(() => Router)
  async getRouter(@Args('id', { type: () => String }) id: string) {
    this.logger.log(`Retrieving router id ${id}`);
    return await this.routerService.findById(id);
  }

  @Query(() => [Router])
  async getRouters() {
    return await this.routerService.findAll();
  }

  @Query(() => Router, { nullable: true })
  async getRouterByUrl(@Args('url', { type: () => String }) url: string) {
    this.logger.log(`Retrieving router with url ${url}`);
    const router = await this.routerService.findByUrl(url);
    return router;
  }

  @Mutation(() => Router)
  async createRouter(
    @Args('createRouterData') createRouterData: RouterCreationInput,
  ) {
    const router = await this.routerService.create(createRouterData);
    this.logger.log(`Created router id ${router._id}`);
    this.pubSub.publish('routerCreated', { routerCreated: router });
    return router;
  }

  @Mutation(() => Router)
  async updateRouter(
    @Args('updateRouterData') updateRouterData: RouterUpdateInput,
  ) {
    const router = await this.routerService.updateById(updateRouterData);
    this.logger.log(`Updated router id ${router._id}`);
    this.pubSub.publish('routerUpdated', { routerUpdated: router });
    return router;
  }

  @Mutation(() => Router)
  async deleteRouter(@Args('id') id: string) {
    const router = await this.routerService.deleteById(id);
    this.logger.log(`Deleted router id ${id}`);
    this.pubSub.publish('routerDeleted', { routerDeleted: router });
    return router;
  }

  @Subscription(() => Router)
  routerCreated() {
    return this.pubSub.asyncIterator('routerCreated');
  }

  @Subscription(() => Router)
  routerDeleted() {
    return this.pubSub.asyncIterator('routerDeleted');
  }

  @Subscription(() => Router)
  routerUpdated() {
    return this.pubSub.asyncIterator('routerUpdated');
  }
}
