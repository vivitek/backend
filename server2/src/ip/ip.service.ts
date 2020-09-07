import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ip } from "./schemas/ip.schema"
import { Model } from "mongoose";

@Injectable()
export class IpService {
    constructor(@InjectModel(Ip.name) private ipModel: Model<Ip>) {}

    async findAll() : Promise<Ip[]> {
        return this.ipModel.find().exec()
    }

    async findById(id: string): Promise<Ip> {
        return this.ipModel.findById(id).exec()
    }

    async create(content: IpCreation): Promise<Ip> {
        return this.ipModel.create(content)
    }

    async deleteById(id: string): Promise<Ip> {
        return (await this.ipModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: IpUpdate): Promise<Ip> {
        const ip = await this.ipModel.findById(id)
        if (content.v4ip)
            ip.v4ip = content.v4ip
        if (content.v6ip)
            ip.v6ip = content.v6ip
        return ip.save()
    }
}

export interface IpCreation {
    v4ip: string;
    v6ip: string
}

export interface IpUpdate {
    v4ip?: string;
    v6ip: string;
}