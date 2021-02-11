import { Logger } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ServiceService } from './service.service';

@Resolver()
export class ServiceResolver {
  private readonly logger: Logger;
  private pubSub: PubSub;

  constructor(private serviceService: ServiceService) {
    this.logger = new Logger('serviceResolver');
    this.pubSub = new PubSub();
  }
}
