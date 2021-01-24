import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagCreation, TagDTO, TagUpdate } from './schemas/tag.dto';
import { TagCreationInput, TagUpdateInput } from './schemas/tag.inputs';
import { Tag } from './schemas/tag.schema';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('/')
  async getAll(): Promise<Array<Tag>> {
    return this.tagService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findById(id);
  }

  @Post('/')
  async create(@Body() content: TagCreationInput): Promise<Tag> {
    return this.tagService.create(content);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Tag> {
    return this.tagService.deleteById(id);
  }

  @Patch('/:id')
  async updateById(@Body() content: TagUpdateInput): Promise<Tag> {
    return this.tagService.updateById(content);
  }
}
