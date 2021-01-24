import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ServiceCreation,
  ServiceDTO,
  ServiceUpdate,
} from './schemas/service.dto';
import { Service } from './schemas/service.schema';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('/')
  async getAll(): Promise<Array<Service>> {
    return this.serviceService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<Service> {
    return this.serviceService.findById(id);
  }

  @Post('/')
  async create(@Body() content: ServiceCreation): Promise<Service> {
    return this.serviceService.create(content);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<Service> {
    return this.serviceService.deleteById(id);
  }

  @Patch('/:id')
  async updateById(
    @Param('id') id: string,
    @Body() content: ServiceUpdate,
  ): Promise<Service> {
    return this.serviceService.updateById(id, content);
  }
}
