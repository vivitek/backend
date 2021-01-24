import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigCreation, ConfigUpdate } from './schemas/config.dto';
import {
  ConfigCreationInput,
  ConfigUpdateInput,
} from './schemas/config.inputs';
import { Config } from './schemas/config.schema';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/')
  async getAll(): Promise<Array<Config>> {
    return this.configService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Config> {
    return this.configService.findById(id);
  }

  @Post('/')
  async create(@Body() content: ConfigCreationInput): Promise<Config> {
    return this.configService.create(content);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Config> {
    return this.configService.deleteById(id);
  }

  @Patch('/:id')
  async updateById(@Body() content: ConfigUpdateInput): Promise<Config> {
    return this.configService.updateById(content);
  }
}
