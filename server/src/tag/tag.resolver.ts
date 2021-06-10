import { Logger, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthGuard } from '../auth/auth.guard';
import { TagCreationInput, TagUpdateInput } from './schemas/tag.inputs';
import { Tag } from './schemas/tag.schema';
import { TagService } from './tag.service';

@Resolver(() => Tag)
@UseGuards(new AuthGuard())
export class TagResolver {
  private readonly logger: Logger;
  private pubSub: PubSub;

  constructor(private tagService: TagService) {
    this.logger = new Logger('TagResolver');
  }

  @Query(() => Tag)
  async getTag(@Args('tagId') tagId: string): Promise<Tag> {
    return this.tagService.findById(tagId);
  }

  @Query(() => [Tag])
  async getTags(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Mutation(() => Tag)
  async createTag(
    @Args('tagCreateData') tagCreateData: TagCreationInput,
  ): Promise<Tag> {
    return this.tagService.create(tagCreateData);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args('tagUpdateData') tagUpdateData: TagUpdateInput,
  ): Promise<Tag> {
    return this.tagService.updateById(tagUpdateData);
  }

  @Mutation(() => Tag)
  async deleteTag(@Args('tagId') tagId: string): Promise<Tag> {
    return this.tagService.deleteById(tagId);
  }
}
