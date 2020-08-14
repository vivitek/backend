import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Service } from "./schemas/service.schema"
import { Model } from "mongoose";
import { Tag } from "src/tag/schemas/tag.schema";
import { Ip } from "src/ip/schemas/ip.schema";

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}

  async findAll() : Promise<Service[]> {
    return this.serviceModel.find().exec()
  }

  async findById(id: string): Promise<Service> {
    return this.serviceModel.findById(id).exec()
  }

  async create(content: ServiceCreation): Promise<Service> {
    return this.serviceModel.create(content)
  }

  async deleteById(id: string): Promise<Service> {
    return (await this.serviceModel.findByIdAndDelete(id))
  }

  async updateById(id: string, content: ServiceUpdate): Promise<Service> {
    const router = await this.serviceModel.findById(id)
    if (content.displayName)
      router.displayName = content.displayName
    if (content.name)
      router.name = content.name
    if (content.bandwidth)
      router.bandwidth = content.bandwidth
    if (content.tags)
      router.tags = content.tags
    if (content.ips)
      router.ips = content.ips
    return router.save()
  }
}

export interface ServiceCreation {
  displayName: string;
  name: string;
  bandwidth: number;
  tags: Array<Tag>;
  ips: Array<Ip>;
}

export interface ServiceUpdate {
  displayName?: string;
  name?: string;
  bandwidth?: number;
  tags?: Array<Tag>;
  ips?: Array<Ip>;
}