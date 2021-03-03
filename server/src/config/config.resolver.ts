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
import { ConfigService } from './config.service';
import {
  ConfigCreationInput,
  ConfigUpdateInput,
} from './schemas/config.inputs';
import { Config } from './schemas/config.schema';

@Resolver()
@UseGuards(new AuthGuard())
export class ConfigResolver {
  private pubSub: PubSub;
  private readonly logger: Logger;

  constructor(private configService: ConfigService) {
    this.pubSub = new PubSub();
    this.logger = new Logger('ConfigResolver');
  }

  @Query(() => [Config])
  async getConfigs() {
    return this.configService.findAll();
  }

  @Query(() => Config, { nullable: true })
  async getConfig(@Args('id') id: string) {
    return this.configService.findById(id);
  }

  @Mutation(() => Config)
  async createConfig(
    @Args('configCreateData') configCreateData: ConfigCreationInput,
  ) {
    const config = await this.configService.create(configCreateData);
    this.pubSub.publish('configCreated', { configCreated: config });
    this.logger.log(`Created config ${config._id}`);
    return config;
  }

  @Mutation(() => Config)
  async updateConfig(
    @Args('configUpdateData') configUpdateData: ConfigUpdateInput,
  ) {
    const config = await this.configService.updateById(configUpdateData);
    this.pubSub.publish('configUpdated', { configUpdated: config });
    this.logger.log(`Updated config ${config._id}`);
    return config;
  }

  @Mutation(() => Config)
  async deleteConfig(@Args('id') id: string) {
    return await this.configService.deleteById(id);
  }

  @Subscription(() => Config, {
    filter: ({ configCreated }, { creator }) => {
      return configCreated.creator == creator || configCreated.public;
    },
  })
  async configCreated(@Args('creatorId') creatorId: string) {
    return this.pubSub.asyncIterator('configCreated');
  }

  @Subscription(() => Config, {
    filter: ({ configUpdated }, { creatorId }) => {
      return configUpdated.creator === creatorId;
    },
  })
  async configUpdated(@Args('creatorId') creatorId: string) {
    return this.pubSub.asyncIterator('configUpdated');
  }
}
