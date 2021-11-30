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
import { User } from '../users/schemas/users.schema';
import { AuthGuard } from '../auth/auth.guard';
import { ConfigService } from './config.service';
import {
  ConfigCreationInput,
  ConfigUpdateInput,
} from './schemas/config.inputs';
import { Config } from './schemas/config.schema';
import { UsersService } from '../users/users.service';

@Resolver(() => Config)
@UseGuards(new AuthGuard())
export class ConfigResolver {
  private pubSub: PubSub;
  private readonly logger: Logger;

  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    this.pubSub = new PubSub();
    this.logger = new Logger('ConfigResolver');
  }

  @Query(() => [Config])
  async getConfigs(): Promise<Array<Config>> {
    return this.configService.findAll();
  }

  @Query(() => Config, { nullable: true })
  async getConfig(@Args('id') id: string): Promise<Config> {
    return this.configService.findById(id);
  }

  @Mutation(() => Config)
  async createConfig(
    @Args('configCreateData') configCreateData: ConfigCreationInput,
  ): Promise<Config> {
    const config = await this.configService.create(configCreateData);
    this.pubSub.publish('configCreated', { configCreated: config });
    this.logger.log(`Created config ${config._id}`);
    return config;
  }

  @Mutation(() => Config)
  async updateConfig(
    @Args('configUpdateData') configUpdateData: ConfigUpdateInput,
  ): Promise<Config> {
    const config = await this.configService.updateById(configUpdateData);
    this.pubSub.publish('configUpdated', { configUpdated: config });
    this.logger.log(`Updated config ${config._id}`);
    return config;
  }

  @Mutation(() => Config)
  async deleteConfig(@Args('id') id: string): Promise<Config> {
    return await this.configService.deleteById(id);
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Subscription(() => Config, {
    filter: ({ configCreated }, { creator }) => {
      return configCreated.creator == creator || configCreated.public;
    },
  })
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  async configCreated(@Args('creatorId') creatorId: string) {
    return this.pubSub.asyncIterator('configCreated');
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Subscription(() => Config, {
    filter: ({ configUpdated }, { creatorId }) => {
      return configUpdated.creator === creatorId;
    },
  })
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  async configUpdated(@Args('creatorId') creatorId: string) {
    return this.pubSub.asyncIterator('configUpdated');
  }

  @ResolveField('creator', () => User)
  async resolveTags(@Parent() config: Config) {
    return await this.userService.findById(config.creator.toString());
  }
}
