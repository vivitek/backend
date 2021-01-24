import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Service } from './schemas/service.schema';
import { Model } from 'mongoose';
import { ServiceCreation, ServiceUpdate } from './schemas/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {}

  async findAll(): Promise<Service[]> {
    return await this.serviceModel.find().exec();
  }

  async findById(id: string): Promise<Service> {
    return await this.serviceModel.findById(id).exec();
  }

  async create(content: ServiceCreation): Promise<Service> {
    const service = new this.serviceModel(content);
    return await service.save();
  }

  async deleteById(id: string): Promise<Service> {
    return await this.serviceModel.findByIdAndDelete(id);
  }

  async updateById(id: string, content: ServiceUpdate): Promise<Service> {
    const service = await this.serviceModel.findById(id);
    // if (content.displayName) service.displayName = content.displayName;
    // if (content.name) service.name = content.name;
    // if (content.bandwidth) service.bandwidth = content.bandwidth;
    // if (content.tags) service.tags = content.tags;
    // if (content.ips) service.ips = content.ips;
    return await service.save();
  }

  async deleteAll(): Promise<any> {
    if (!process.env.DEBUG) return null;
    return this.serviceModel.db.dropDatabase();
  }
}
