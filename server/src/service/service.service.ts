import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Service } from "./schemas/service.schema"
import { Model } from "mongoose";
import { ServiceCreation, ServiceDTO, ServiceUpdate } from "./schemas/service.dto";

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) {}

  async findAll() : Promise<ServiceDTO[]> {
    return (await this.serviceModel.find().exec()).map(d => toDTO(d))
  }

  async findById(id: string): Promise<ServiceDTO> {
    return toDTO(await this.serviceModel.findById(id).exec())
  }

  async create(content: ServiceCreation): Promise<ServiceDTO> {
    return toDTO(await this.serviceModel.create(content))
  }

  async deleteById(id: string): Promise<ServiceDTO> {
    return toDTO(await this.serviceModel.findByIdAndDelete(id))
  }

  async updateById(id: string, content: ServiceUpdate): Promise<ServiceDTO> {
    const service = await this.serviceModel.findById(id)
    if (content.displayName)
      service.displayName = content.displayName
    if (content.name)
      service.name = content.name
    if (content.bandwidth)
      service.bandwidth = content.bandwidth
    if (content.tags)
      service.tags = content.tags
    if (content.ips)
      service.ips = content.ips
    return toDTO(await service.save())
  }

    async deleteAll(): Promise<any> {
        if (!process.env.DEBUG) return null
        return this.serviceModel.db.dropDatabase()
    }
}

function toDTO(data: Service) {
  return !data ? null : {
    _id: data._id,
    displayName: data.displayName,
    name: data.name,
    bandwidth: data.bandwidth,
    tags: data.tags,
    ips: data.ips
  }
}