import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ip } from "./schemas/ip.schema"
import { Model } from "mongoose";

@Injectable()
export class IpService {
    constructor(@InjectModel(Ip.name) private routerModel: Model<Ip>) {}

    async findAll() : Promise<Ip[]> {
        return this.routerModel.find().exec()
    }

    async findById(id: string): Promise<Ip> {
        return this.routerModel.findById(id).exec()
    }

    async create(content: IpCreation): Promise<Ip> {
        return this.routerModel.create(content)
    }

    async deleteById(id: string): Promise<Ip> {
        return (await this.routerModel.findByIdAndDelete(id))
    }

    async updateById(id: string, content: IpUpdate): Promise<Ip> {
        const router = await this.routerModel.findById(id)
        if (content.v4ip)
            router.v4ip = content.v4ip
        if (content.v6ip)
            router.v6ip = content.v6ip
        return router.save()
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