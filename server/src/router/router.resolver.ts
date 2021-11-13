import { Logger, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from '../auth/auth.guard';
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
  @UseGuards(new AuthGuard())
  async getRouter(@Args('id', { type: () => String }) id: string): Promise<Router> {
    this.logger.log(`Retrieving router id ${id}`);
    return await this.routerService.findById(id);
  }

  @Query(() => [Router])
  @UseGuards(new AuthGuard())
  async getRouters(): Promise<Array<Router>> {
    return await this.routerService.findAll();
  }

  @Query(() => Router, { nullable: true })
  @UseGuards(new AuthGuard())
  async getRouterByUrl(@Args('url', { type: () => String }) url: string): Promise<Router> {
    this.logger.log(`Retrieving router with url ${url}`);
    const router = await this.routerService.findByUrl(url);
    return router;
  }

  @Mutation(() => Router)
  async createRouter(
    @Args('createRouterData') createRouterData: RouterCreationInput,
  ): Promise<Router> {
    const router = await this.routerService.create(createRouterData);
    this.logger.log(`Created router id ${router._id}`);
    this.pubSub.publish('routerCreated', { routerCreated: router });
    return router;
  }

  @Mutation(() => Router)
  @UseGuards(new AuthGuard())
  async updateRouter(
    @Args('updateRouterData') updateRouterData: RouterUpdateInput,
  ): Promise<Router> {
    const router = await this.routerService.updateById(updateRouterData);
    this.logger.log(`Updated router id ${router._id}`);
    this.pubSub.publish('routerUpdated', { routerUpdated: router });
    return router;
  }

  @Mutation(() => Router)
  @UseGuards(new AuthGuard())
  async deleteRouter(@Args('id') id: string): Promise<Router> {
    const router = await this.routerService.deleteById(id);
    this.logger.log(`Deleted router id ${id}`);
    this.pubSub.publish('routerDeleted', { routerDeleted: router });
    return router;
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Subscription(() => Router)
  @UseGuards(new AuthGuard())
  routerCreated() {
    return this.pubSub.asyncIterator('routerCreated');
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Subscription(() => Router)
  @UseGuards(new AuthGuard())
  routerDeleted() {
    return this.pubSub.asyncIterator('routerDeleted');
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Subscription(() => Router)
  @UseGuards(new AuthGuard())
  routerUpdated() {
    return this.pubSub.asyncIterator('routerUpdated');
  }
}
