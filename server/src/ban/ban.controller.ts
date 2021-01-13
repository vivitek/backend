import { BanService } from './ban.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { BanCreation } from './schemas/ban.inputs';

import { BanUpdate } from './schemas/ban.dto';
import { Ban } from './schemas/ban.schema';

@Controller('ban')
export class BanController {
  constructor(private readonly banService: BanService) {}

  @Get()
  async getAll(): Promise<Array<Ban>> {
    return this.banService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Ban> {
    return this.banService.findById(id);
  }

  @Post('/')
  async create(@Body() content: BanCreation): Promise<Ban> {
    return this.banService.create(content);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Ban> {
    return this.banService.deleteById(id);
  }

  @Patch('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() content: BanUpdate,
  ): Promise<Ban> {
    return this.banService.updateById(id, content);
  }
}
