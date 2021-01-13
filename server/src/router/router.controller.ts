import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { RouterService } from './router.service';
import { RouterCreation, RouterDTO, RouterUpdate } from './schemas/router.dto';
import { Router } from './schemas/router.schema';

@Controller('router')
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @Get('/')
  async getAll(): Promise<Array<Router>> {
    return this.routerService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Router> {
    return this.routerService.findById(id);
  }

  @Post('/')
  async create(@Body() content: RouterCreation): Promise<Router> {
    return this.routerService.create(content);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Router> {
    return this.routerService.deleteById(id);
  }

  @Patch('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() content: RouterUpdate,
  ): Promise<Router> {
    return this.routerService.updateById(id, content);
  }
}
