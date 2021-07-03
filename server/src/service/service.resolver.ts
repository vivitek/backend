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
import { Tag } from '../tag/schemas/tag.schema';
import { TagService } from '../tag/tag.service';
import { AuthGuard } from '../auth/auth.guard';
import {
  ServiceCreationInput,
  ServiceUpdateInput,
} from './schemas/service.inputs';
import { Service } from './schemas/service.schema';
import { ServiceService } from './service.service';

@Resolver(() => Service)
@UseGuards(new AuthGuard())
export class ServiceResolver {
  private readonly logger: Logger;
  private pubSub: PubSub;

  constructor(
    private serviceService: ServiceService,
    private tagService: TagService,
  ) {
    this.logger = new Logger('serviceResolver');
    this.pubSub = new PubSub();
  }

  @Query(() => [Service])
  async getServicesForRouter(
    @Args('routerId') routerId: string,
  ): Promise<Service[]> {
    return await this.serviceService.findByRouter(routerId);
  }

  @Mutation(() => Service)
  async createService(
    @Args('serviceCreationData') serviceCreationData: ServiceCreationInput,
  ): Promise<Service> {
    const service = await this.serviceService.create(serviceCreationData);
    this.logger.log(`Created service with id ${service._id}`);
    this.pubSub.publish('serviceCreated', { serviceCreated: service });
    return service;
  }

  @Mutation(() => Service)
  async updateService(
    @Args('serviceUpdateData') serviceUpdateData: ServiceUpdateInput,
  ): Promise<Service> {
    const service = await this.serviceService.updateById(serviceUpdateData);
    this.logger.log(`Updated service with id ${service._id}`);
    this.pubSub.publish('serviceUpdated', { serviceUpdated: service });
    return service;
  }

  @Mutation(() => Service)
  async deleteService(@Args('serviceId') serviceId: string): Promise<Service> {
    const service = await this.serviceService.deleteById(serviceId);
    this.logger.log(`Deleted service with id ${serviceId}`);
    this.pubSub.publish('serviceDeleted', { serviceDeleted: service });
    return service;
  }

  @Mutation(() => [Service])
  async deleteServicesByRouter(@Args('routerId') routerId: string): Promise<Service[]> {
    return this.serviceService.deleteByRouter(routerId);
  }

  @Subscription(() => Service, {
    filter: ({ serviceCreated }, { routerId }) =>
      serviceCreated.router === routerId,
  })
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  serviceCreated(@Args('routerId') routerId: string): AsyncIterator<Service> {
    return this.pubSub.asyncIterator('serviceCreated');
  }

  @Subscription(() => Service, {
    filter: ({ serviceUpdated }, { routerId }) =>
      serviceUpdated.router === routerId,
  })
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  serviceUpdated(@Args('routerId') routerId: string): AsyncIterator<Service> {
    return this.pubSub.asyncIterator('serviceUpdated');
  }

  @Subscription(() => Service, {
    filter: ({ serviceDeleted }, { routerId }) =>
      serviceDeleted.router === routerId,
  })
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  serviceDeleted(@Args('routerId') routerId: string): AsyncIterator<Service> {
    return this.pubSub.asyncIterator('serviceDeleted');
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @ResolveField('tags', () => [Tag])
  async resolveTags(@Parent() service: Service) {
    return service.tags.map(async e => {
      return await this.tagService.findById(e.toString())
    });
  }
}
