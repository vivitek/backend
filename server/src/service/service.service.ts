import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema';
import { Model } from 'mongoose';
import {
  ServiceCreationInput,
  ServiceUpdateInput,
} from './schemas/service.inputs';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return await this.serviceModel.find().exec();
  }

  async findByRouter(routerId: string): Promise<Service[]> {
    return await this.serviceModel.find({ router: routerId });
  }

  async findById(id: string): Promise<Service> {
    return await this.serviceModel.findById(id).exec();
  }

  async create(content: ServiceCreationInput): Promise<Service> {
    const service = new this.serviceModel(content);
    return await service.save();
  }

  async deleteById(id: string): Promise<Service> {
    return await this.serviceModel.findByIdAndDelete(id);
  }

  async deleteByRouter(routerId: string): Promise<Service[]> {
    const services = await this.findByRouter(routerId);
    services.forEach(async e => {
      await e.delete();
    });
    return services;
  }

  async updateById(content: ServiceUpdateInput): Promise<Service> {
    const service = await this.serviceModel.findByIdAndUpdate(
      content._id,
      content,
      { new: true },
    );
    return await service.save();
  }
}
